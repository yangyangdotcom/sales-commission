module.exports = {
  async beforeUpdate(event) {
    const { data, where } = event.params;

    console.log('Before update hook triggered:', data);

    const existingOrder = await strapi.db.query('api::order.order').findOne({
      where,
    });

    if (
      existingOrder &&
      existingOrder.order_status === 'pending' &&
      data.order_status === 'complete' &&
      !existingOrder.commission
    ) {
      console.log('Calculating commission...');
      const commission = existingOrder.amount * 0.1;

      data.commission = commission;
      console.log('Commission added to the update payload.');
    }
  },
};
