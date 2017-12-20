var App = function () {
    var currentPage = '';
    var collapsed = false;
    var is_mobile = false;
    var is_mini_menu = false;
    var is_fixed_header = false;
    var responsiveFunctions = [];

    /*-----------------------------------------------------------------------------------*/
	/*	Initialize Database
	/*-----------------------------------------------------------------------------------*/
    var initDatabase = function (id) {
        var url = '/' + id + '.dza';

        $.ajax({
            type: 'GET',
            url: url,
            dataType: 'xml',
            success: function (data) {  
                $(data).find('device').each(function () {
                   // alert($(this).find('id').text());
                    $('table#datatable').find('tbody')
                        .append($('<tr>')
                            .append($('<td>')
                                .text($(this).find('id').text())
                            )
                         )          
                });                         
            }
        })
    }

    /*-----------------------------------------------------------------------------------*/
	/*	Data Tables
	/*-----------------------------------------------------------------------------------*/
    var handleDataTables = function () {
        initDatabase(11111967);
    }

    return {
        init: function () {
            if (App.isPage('index')) {
                handleDataTables();
            }

            if (App.isPage('table')) {
                handleDataTables();
            }
        },

        setPage: function (name) {
            currentPage = name;
        },

        isPage: function (name) {
            return currentPage == name ? true : false;
        },


    }
}();

module.exports = App;