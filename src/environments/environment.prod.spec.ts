import { ApiUrl } from './environment';

describe('Environment Configuration', () => {
  it('should have a defined production property', () => {
    expect(ApiUrl.getAdminUrl).toBeDefined();
  });
});

import { QueryPage } from './environment';

describe('QueryPage', () => {
    it('should have noQueriesFoundImage property defined', () => {
      expect(QueryPage.noQueriesFoundImage).toBeDefined();
    });
});

import { ProductPageData } from './environment';

describe('ProductPageData', () => {
    it('should have noQueriesFoundImage property defined', () => {
      expect(ProductPageData.productNotFoundImage).toBeDefined();
    });
});

import { ProductDescriptionData } from './environment';

describe('ProductDescriptionData', () => {
    it('should have noQueriesFoundImage property defined', () => {
      expect(ProductDescriptionData.featuredProductsImage).toBeDefined();
    });
});

import { myOrdersData } from './environment';

describe('myOrdersData', () => {
    it('should have noQueriesFoundImage property defined', () => {
      expect(myOrdersData.emptyOrderImage).toBeDefined();
    });
});

import { orderDetails } from './environment';

describe('orderDetails', () => {
  it('should have shippingCharges property defined', () => {
    expect(orderDetails.shippingCharges).toBeDefined();
  });

  it('should have gst property defined', () => {
    expect(orderDetails.gst).toBeDefined();
  });

  it('should have shippingCharges with a default value of 0', () => {
    expect(orderDetails.shippingCharges).toEqual(0);
  });

  it('should have gst with a default value of 0', () => {
    expect(orderDetails.gst).toEqual(0);
  });
});


import { PaymentData } from './environment';

describe('PaymentData', () => {
  it('should have accountNumberValidation property defined', () => {
    expect(PaymentData.accountNumberValidation).toBeDefined();
  });

  it('should have cvvNumberValidation property defined', () => {
    expect(PaymentData.cvvNumberValidation).toBeDefined();
  });

  it('should have expectedDeliveryData property defined', () => {
    expect(PaymentData.expectedDeliveryData).toBeDefined();
  });

  it('should have accountNumberValidation with the correct regex pattern', () => {
    expect(PaymentData.accountNumberValidation).toMatch('[0-9]{0,16}');
  });

  it('should have cvvNumberValidation with the correct regex pattern', () => {
    expect(PaymentData.cvvNumberValidation).toMatch('[0-9]*');
  });

  it('should have expectedDeliveryData with a number value of 5', () => {
    expect(PaymentData.expectedDeliveryData).toEqual(5);
  });
  
});