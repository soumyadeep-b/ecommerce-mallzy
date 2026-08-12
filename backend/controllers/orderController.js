const addOrderItems = async (req, res) => {
  try {
    const { items, totalAmount, address, paymentId } = req.body;
    if (items && items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    } else {
      const order = new Order({
        userId: req.user._id,
        items,
        totalAmount,
        address,
        paymentId
      });
      const createdOrder = await order.save();

      // Send Order Confirmation Email
      const message = `
        <h2>Order Confirmation</h2>
        <p>Hello ${req.user.name},</p>
        <p>Your order has been successfully placed! Order ID: <strong>${createdOrder._id}</strong></p>
        <p>Total Amount Paid: $${totalAmount.toFixed(2)}</p>
        <p>It will be shipped to: ${address.street}, ${address.city}</p>
        <p>Thank you for shopping with Mallzy!</p>
      `;

      await sendEmail({
        email: req.user.email,
        subject: 'Mallzy - Order Confirmation.',
        message
      });

      res.status(201).json(createdOrder);
    }
  } catch (error) {
    console.error('ORDER ERROR - full object:', error);
    console.error('ORDER ERROR - message:', error.message);
    console.error('ORDER ERROR - stack:', error.stack);
    res.status(500).json({ message: error.message || 'Something went wrong, please try again.' });
  }
};