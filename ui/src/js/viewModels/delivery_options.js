/**
 * Delivery Options module
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout',
        'ojs/ojmodule', 'ojs/ojcheckboxset', 'ojs/ojradioset',
        'ojs/ojdatetimepicker'
], function (oj, ko, $) {
    /**
     * The view model for the delivery options view template
     */

    function DeliveryOptionsViewModel() {

        var self = this;
        var rootViewModel = ko.dataFor(document.getElementById('globalBody'));
        var shipping = rootViewModel.order.get('shippping');
        var specialDetails = rootViewModel.order.get('special_details');

        self.deliveryMethodExpanded = ko.observable(true);
        self.specialDetailsExpanded = ko.observable(true);

        self.firstName = ko.observable();
        self.lastName = ko.observable();
        self.deliveryMethod = ko.observableArray();
        self.eta = ko.observable();

        self.dateConverter = ko.observable(
            oj.Validation.converterFactory(oj.ConverterFactory.CONVERTER_TYPE_DATETIME).createConverter(
                {
                    pattern : 'dd-MMM-yyyy'
                }
            )
        );

        self.personalMessage = ko.observable();
        self.giftWrap = ko.observableArray();

        self.handleAttached = function(info) {

            // Delivery Method
            if (shipping != null) {
                self.firstName(shipping.first_name);
                self.lastName(shipping.last_name);
                oj.Logger.error(shipping.shipping_method);
                self.deliveryMethod(shipping.shipping_method);
                self.eta(shipping.ETA);
            } else {
                // Add shipping object to model
                rootViewModel.order.set("shipping", {});
            }

            if (specialDetails != null) {
                self.personalMessage(specialDetails.personal_message);
    
                if (specialDetails.gift_wrapping) {
                    self.giftWrap(["giftWrap"]);
                }
            } else {
                // Add special details object to model
                rootViewModel.order.set("special_details", {});
            }

        };

        self.onFirstNameChanged = function(info) {
            rootViewModel.order.get('shipping').first_name = self.firstName();
        };

        self.onLastNameChanged = function(info) {
            rootViewModel.order.get('shipping').last_name = self.lastName();
        };

        self.onEtaChanged = function(info) {
            rootViewModel.order.get('shipping').eta = self.eta();
        };

        self.onDeliveryMethodChanged = function() {
            rootViewModel.order.get('shipping').shipping_method = self.deliveryMethod()[0];
        };

        self.onGiftWrapChanged = function() {

            if (self.giftWrap().length === 0) {
                rootViewModel.order.get('special_details').gift_wrapping = false;
            } else {
                rootViewModel.order.get('special_details').gift_wrapping = true;
            }

        };

        self.onPersonalMessageChanged = function() {

            rootViewModel.order.get('special_details').personal_message = self.personalMessage();

        };

    }
    
    return new DeliveryOptionsViewModel();

});
