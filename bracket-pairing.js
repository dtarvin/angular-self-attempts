var Pet = (
        function() {
            console.log('Pet initializing');

            var dataTable;

            var init = function() {
                console.log('Pet.init() starting');
                try {

                    _initDataTable();

                    j$("[id$=':petTable'] > tbody > tr").each(
                        function(index) {
                            j$(this).click(
                                function(e) {
                                    Pet.view(this);
                                }
                            );
                        }
                    );

                    j$("#petSpinner").hide();
                    j$("#petSection").fadeIn(200);
                    console.log('Pet.init() ending');

                } 
                catch (err) {
                    console.error(err);
                }
            }

            var _initDataTable = function () {
                console.log('Pet._initDataTable() entering');
                dataTable = j$("[id$=':petTable']").DataTable(
                    {
                        "order": [0, 'asc'],
                        "searching": false,
                        "paging": false,
                        "info": false,
                        "autoWidth": false,
                        "rowId": 0,
                    }
                );
            }

            var view = function(selectedRow) {
                console.log('Pet.view() entering');
                petName = j$(selectedRow).attr('id');
                _toggleViewSubRow(selectedRow, petName);
            }

            var _toggleViewSubRow = function(selectedRow, petName) {
                console.log('Pet._toggleViewSubRow() petName=', petName, ', selectedRow=', selectedRow);
                var parentRow = Pet.dataTable().row(selectedRow);
                var child = parentRow.child();

                if (child && child.length && child.hasClass('show')) {
                    _hideViewSubRow(selectedRow, child);
                } 
                else {
                    _showViewSubRow(selectedRow, parentRow, petName);
                }
            }

            var _hideViewSubRow = function(selectedRow, child) {
                console.log('Pet._hideViewSubRow starting');
                // Point the chevron/arrow downwards
                j$(selectedRow).addClass('collapsed');

                // Hide child row
                j$(child).find('div').eq(0).slideUp(
                    100, function() {
                        child.removeClass('show');
                    }
                );
            }

            var _showViewSubRow = function(selectedRow, parentRow, petName) {
                console.log('Pet._showViewSubRow entering');
                // Point the cevron/arrow to the side
                j$(selectedRow).removeClass('collapsed');

                // hide all child rows
                if(j$("[id$=':petTable'] tr.childrow.collapse.show").find('div').eq(0).length > 0) {
                    j$("[id$=':petTable'] tr.childrow.collapse.show").prev().addClass('collapsed');
                    j$("[id$=':petTable'] tr.childrow.collapse.show").find('div').eq(0).slideUp(
                        100, function () {
                            j$("[id$=':petTable'] tr.childrow.collapse.show").removeClass('show');
                            _showViewSubRowTable(parentRow, petName);
                        }
                    );
                } 
                else {
                    _showViewSubRowTable(parentRow, petName);
                }
            }

            var _showViewSubRowTable = function(parentRow, petName) {
                console.log('Pet._showViewSubRowTable() entering');
                var child = parentRow.child();

                if (child && child.length) {
                    console.log('Pet._showViewSubRowTable child row already exists, just show it');

                    child.addClass('show');
                    j$(child).find('div').eq(0).slideDown(
                        100, function () {

                        }
                    );
                } 
                else {
                    console.log('Pet._showViewSubRowTable() show new');

                    // create child row add spinner to child row
                    // var html = j$('#viewRecurringHistorySpinner').html();
                    var spinnerHTML = `<div class='spinner' style='display:none'><i class='fa fa-spinner fa-2x fa-spin'></i></div>`;
                    parentRow.child(spinnerHTML);

                    // add styling to row
                    parentRow.child().addClass('childrow');

                    // show the row
                    parentRow.child.show();

                    j$('.spinner', parentRow.child()).slideDown(100);

                    PetSubRow.getPetSubRowInfo(petName);
                }
            }


            /* var getListOfPets = function() {
                console.log('RecurringSummary.getRecurringSummaryInfo()');
                createPetsList();
            }; */

            return {
                init: init,
                dataTable: dataTable,
                view: view
            }
        }
());