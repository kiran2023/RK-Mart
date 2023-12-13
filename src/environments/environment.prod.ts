export const ApiUrl = {
    production: true,

    getAdminUrl: 'http://localhost:3000/admin',
    getProductDataUrl: 'http://localhost:3000/ProductData',
    getCategoryUrl: 'http://localhost:3000/category',
    getCategoryUrlTypes: 'http://localhost:3000/categoryTypes',
    getRegisteredUsersUrl: 'http://localhost:3000/registeredUser',
    cartUrl: 'http://localhost:3000/cartData',
    usersCartUrl: 'http://localhost:3000/cartData?uid=',
    usersCartDeleteUrl: 'http://localhost:3000/cartData?uid=',
    orderUrl: 'http://localhost:3000/orders',
    ordersDataUrl: 'http://localhost:3000/orders?uid=',
    salesAmountUrl: 'http://localhost:3000/salesAmount',
    orderStatusUrl: 'http://localhost:3000/orderStatusUpdate',
    orderStatusUpdateUrl: 'http://localhost:3000/orderStatusUpdate?orderid=',
    paymentUrl: 'http://localhost:3000/payments',
    queries: 'http://localhost:3000/Queries',
    queriesSpecificUrl: 'http://localhost:3000/Queries?uid=',
    forgotPasswordRequestUrl: 'http://localhost:3000/forgotPasswordRequest',
    registrationLogUrl: 'http://localhost:3001/registrationLog',
    errorLogUrl: 'http://localhost:3001/errorLog',
    invalidLoginLogUrl: 'http://localhost:3001/invalidLoginLog',

    maintenance: false,
    adminLogo: "../../../assets/images/adminLogo.png"

};

export const logData = {
    message: '',
    level: 'INFO',
    timestamp: new Date().toLocaleString()
};

export const loginLogData = {
    message: '',
    level: 'WARN',
    timestamp: new Date().toLocaleString()
  };

export const CartConstantData = {

    cartComponent: {
        cartEmptyImage: "https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg?w=740",
        shippingCharges: 0
    },

    cartTypescript: {
        productQuantityData: 1,
        subtotal: 0,
    }
}

export const ContactUsValidationData = {

    contactUsComponent: {
        locationUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3911.933835570356!2d77.72430831479062!3d11.339543451647614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba96f4138c09375%3A0x405a7d329f30110c!2sPS%20Park%2C%20Erode%20Fort%2C%20Erode%2C%20Tamil%20Nadu%20638001!5e0!3m2!1sen!2sin!4v1651581190670!5m2!1sen!2sin",
    },

    contactUsTypescript: {
        usernameRegex: "^[A-Za-z]+$",
        usermailRegex: "^[0-9a-zA-Z]+(?:[.]{0,1}[0-9a-zA-Z])?[@][a-zA-Z]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3}){0,1}$"
    }

}

export const FooterData = {
    socialMediaLinks: {
        facebook: "https://www.facebook.com/people/Kiran-Patil/100013552217592/",
        twitter: "https://twitter.com/im__Kiran23?t=jma8P1Eal0qdqeyax9YrPQ&s=09",
        instagram: "https://www.instagram.com/im_real_fcg/",
        linkedin: "https://www.linkedin.com/in/kiran-n-0a903b224",
        mailTo: "mailto:cecskiran23@gmail.com",
        telephone: "tel:+919486337716",
        redirectMap: "https://goo.gl/maps/Xh3yJtKUUQozvtAr8"
    }
}

export const HomePageData = {
    landingPageImage: {
        landingImage: "../assets/images/LandingPageImage.png"
    },

    salesImages: {
        householdCategory: "../assets/images/Sales/order.jpg",
        beveragesCategory: "../assets/images/SaleImages/SummerSale.png",
        groceriesCategory: "../assets/images/Sales/veggies.jpg"
    },

    salePopup: {
        salePopupImageUrl: "../assets/images/Sales/Sale.jpg"
    }
}

export const Maintenance = {
    maintenanceImage: "../../../assets/images/maintenance.jpg"
}

export const MenuBar = {
    images: {
        loginModalImage: "../assets/images/SaleImages/SocialMedia.png",
        registerModalImage: "../assets/images/SaleImages/SocialMedia.png"
    },

    validations: {
        usernameValidation: {
            alphabetsValidation: "^[a-zA-Z]+$",
            whiteSpaceValidation: /^\S+$/,
            nameValidation: /^(?!.*([A-Za-z])\1\1\1)[A-Za-z0-9 ]*$/
        },
        mailMobilePasswordValidation: {
            mailValidation: "^[0-9a-zA-Z]+(?:[.]{0,1}[0-9a-zA-Z])?[@][a-zA-Z]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3}){0,1}$",
            mobileValidation: "^[6-9]{1}[0-9]{9}$",
            passwordValidation: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{7,}$"
        }
    }
}

export const myOrdersData = {
    emptyOrderImage: "https://img.freepik.com/free-vector/abstract-shaped-order-now-banner_23-2148718483.jpg?w=740&t=st=1691249683~exp=1691250283~hmac=e8e70763b6d5396a18f4ee77ee47da7e56d2f6b6cb9e8c166c64436dd57f62ff"
}

export const orderDetails = {
    shippingCharges: 0,
    gst: 0
}

export const PaymentData = {
    accountNumberValidation: "[0-9]{0,16}",
    cvvNumberValidation: "^[0-9]*$",
    expectedDeliveryData: 5
}

export const ProductDescriptionData = {
    featuredProductsImage: "../assets/images/Sales/order.jpg"
}

export const ProductPageData = {
    productNotFoundImage: "https://th.bing.com/th/id/OIP.7k_AIfprstHavH3OHBkXmgHaG2?pid=ImgDet&rs=1"
}

export const QueryPage = {
    noQueriesFoundImage: "https://img.freepik.com/premium-vector/concept-searching-opportunities-decisions-new-business-ideas-staff-people-looking-into-future-choosing-direction-development-colorful-flat-vector-illustration-isolated-whitexa_647728-53.jpg?w=740"
}

export const ShippingPage = {
    mailValidation: "^[0-9a-zA-Z]+(?:[.]{0,1}[0-9a-zA-Z])?[@][a-zA-Z]+[.][a-zA-Z]{2,3}([.][a-zA-Z]{2,3}){0,1}$",
    alphabetsValidation: "^[a-zA-Z]+$",
    numberValidation: "^[0-9]*$",
    mobileValidation: "^[6-9]{1}[0-9]{9}$"
}