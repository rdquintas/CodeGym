var _data = [];
var _data_index = [];

var _TAB_SIZE = 15; // this is used for the indentation TAB size


require([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/dom-class',
    'dojo/aspect',
    'dojo/query',
    'dojo/dom-style',
    'dijit/form/TextBox',
    'dijit/form/Button',
    'dstore/Memory',
    'dstore/Trackable',
    'dgrid/ColumnSet',
    'dgrid/OnDemandGrid',
    'dgrid/Grid',
    'dgrid/extensions/CompoundColumns',
    'dgrid/Selection',
    'dgrid/Keyboard',
    'dgrid/Editor',
    'dgrid/extensions/ColumnResizer',
    'dgrid/extensions/ColumnHider',
    'dojo/domReady!'
], function(declare, lang, on, domClass, aspect, query, domStyle, TextBox, Button, Memory, Trackable, ColumnSet,
    OnDemandGrid, Grid, CompoundColumns, Selection, Keyboard, Editor, ColumnResizer, ColumnHider) {

    createData();

    // var myDialog = new Dialog({
    //     title: "My Dialog",
    //     content: "Test content.",
    //     style: "width: 300px"
    // });

    // var store = new(declare([Memory, Trackable]))({
    //     data: _data
    // });

    // var grid = new(declare([OnDemandGrid, CompoundColumns, ColumnSet, Editor, Selection, Keyboard]))({
    //     collection: store,
    //     columnSets: getColumnSets(2)
    // }, "grid");

    // grid.startup();



    var grid = new(declare([Grid, CompoundColumns, ColumnSet, Editor, Selection, Keyboard]))({
        columnSets: getColumnSets(2)
    }, "grid");

    grid.renderArray(window._data);

    // dojo.connect(query('button.add')[0], "onmouseup", addRow);
    dojo.connect(query('button.add')[0], "onclick", addRow);
    dojo.connect(query('button.delete')[0], "onclick", deleteRow);
    dojo.connect(query('button.clone')[0], "onclick", cloneRow);
    dojo.connect(query('button.prettify')[0], "onclick", doPrettify);
    dojo.connect(query('button.save')[0], "onclick", doSaveToSAP);
    dojo.connect(query('button.settings')[0], "onclick", toggleSettings);

    // Style header and sub-header columns
    domClass.add(query(".dgrid-column-set-0 tr")[1], "header");
    domClass.add(query(".dgrid-column-set-1 tr")[1], "header");
    domClass.add(query(".dgrid-column-set-0 tr")[2], "sub-header");
    domClass.add(query(".dgrid-column-set-1 tr")[2], "sub-header");

    doIndentation(window._data);

    grid.on('dgrid-datachange', lang.hitch(this, function(e) {
        var row = grid.row(e);
        var parent_spacer = 0;

        for (var i = 0; i < e.srcElement.classList.length; i++) {
            if (e.srcElement.classList[i] === "field-project") {
                var tmpProjId = e.value;
                window._data[row.id].line_type = "W";

                if (e.value.split(",")[0] === "a" || e.value.split(",")[0] === "A") {
                    window._data[row.id].line_type = "A";
                    tmpProjId = e.value.split(",")[1];
                }

                if (e.value.split(",")[0] === "w" || e.value.split(",")[0] === "W") {
                    window._data[row.id].line_type = "W";
                    tmpProjId = e.value.split(",")[1];
                }


                if (e.value.split(",")[0] === "t1" || e.value.split(",")[0] === "T1") {
                    return;
                }

                if (e.value.split(",")[0] === "t2" || e.value.split(",")[0] === "T2") {
                    return;
                }

                if (e.value.split(",")[0] === "excel" || e.value.split(",")[0] === "excel") {
                    return;
                }

                window._data_index.push(tmpProjId);
                window._data[row.id].project = tmpProjId;
                window._data[row.id].parent_project = tmpProjId.substr(0, tmpProjId.length - 3);

                for (var ii = 0; ii < window._data.length; ii++) {
                    if (window._data[ii].project === window._data[row.id].parent_project) {
                        parent_spacer = window._data[ii].spacer;
                        break;
                    };
                };

                //set spacer
                if (window._data[row.id].parent_project && window._data[row.id].parent_project.length < window._data[row.id].project.length) {
                    window._data[row.id].spacer = parent_spacer + _TAB_SIZE; //window is used for the indentation TAB size
                } else {
                    window._data[row.id].spacer = parent_spacer;
                }
            };

            if (e.srcElement.classList[i] === "field-project_description") {
                window._data[row.id].project_description = e.value;
            }

            if (e.srcElement.classList[i] === "field-profit_centre") {
                window._data[row.id].profit_centre = e.value;
            }

            if (e.srcElement.classList[i] === "field-project_manager") {
                window._data[row.id].project_manager = e.value;
            }

            if (e.srcElement.classList[i] === "field-project_director") {
                window._data[row.id].project_director = e.value;
            }

            if (e.srcElement.classList[i] === "field-billable") {
                window._data[row.id].billable = e.value;
            }

            if (e.srcElement.classList[i] === "field-fee_type") {
                window._data[row.id].fee_type = e.value;
            }

            if (e.srcElement.classList[i] === "field-itemized_for") {
                window._data[row.id].itemized_for = e.value;
            }

            if (e.srcElement.classList[i] === "field-client_ref") {
                window._data[row.id].client_ref = e.value;
            }

        };
    }));


    /***********************************************************
     * performs indentation for the 1st column only
     ***********************************************************/
    function doIndentation(arr) {
        window._data.forEach(function(elem) {
            if (elem.line_type !== "P") {
                domStyle.set(query("#grid-row-" + elem.id + " .field-project")[0], "padding-left", elem.spacer + "px");
            };

            //Style column type ACTIVITY
            if (elem.line_type === "A") {
                domClass.add(query("#grid-row-" + elem.id + " tr")[0], "activity-row");
            };
        });
    }


    function addRow(e) {
        window._data.unshift(grid_line(0, "NEW"));

        grid.refresh()
        grid.renderArray(window._data);
        doIndentation(window._data);
    }

    function deleteRow(e) {
        var selectedRow = Object.keys(grid.selection)[0];
        if (selectedRow) {

            window._data_index.splice(selectedRow, 1);
            window._data.splice(selectedRow, 1);

            //correct the ID's
            for (var i = 0; i < window._data.length; i++) {
                window._data[i].id = i
            };

            grid.refresh()
            grid.renderArray(window._data);
            doIndentation(window._data);
        };
    }

    function cloneRow(e) {
        var selectedRow = parseInt(Object.keys(grid.selection)[0]);

        // clone the row
        if (selectedRow) {
            var newRow = JSON.parse(JSON.stringify(window._data[selectedRow]));
            window._data.push(newRow);
            window._data_index.push(newRow.project);
        };

        // now we have to re-order
        window._data_index.sort();
        var result = [];
        window._data_index.forEach(function(key) {
            for (var i = 0; i < window._data.length; i++) {
                if (window._data[i] && key === window._data[i].project) {
                    result.push(window._data[i]);
                    window._data[i] = null;
                    break;
                };
            };
        })

        window._data = result.slice();

        // correct the ID's
        for (var i = 0; i < window._data.length; i++) {
            window._data[i].id = i;
        };

        grid.refresh()
        grid.renderArray(window._data);
        doIndentation(window._data);
    }




    /***********************************************************
     * toggles the settings area
     ***********************************************************/
    function toggleSettings(e) {

        var ease = '';
        var dur;

        var size = $('div.mainheader').height();

        var isClosed = true;

        if (size === 400) {
            size = "67px";
            ease = "swing";
            dur = 300;
            isClosed = false;
        } else {
            ease = "easeOutElastic";
            size = "400px";
            dur = 1000;
            isClosed = true;
        }

        $('div.mainheader').animate({
            height: size
        }, {
            duration: dur,
            easing: ease,
            complete: function() {
                // $("." + selectedMenuClass).removeClass("no-pointers");
            }
        });

        if (isClosed) {
            $('div.mainheader .form').fadeIn(1000);
        } else {
            $('div.mainheader .form').fadeOut(300);

        }
    }


    /***********************************************************
     * performs simulation of Save to SAP, while showing line with errors
     ***********************************************************/
    function doSaveToSAP(e) {
        domClass.add(query("#grid-row-2")[0], "line-with-error");
        domClass.add(query("#grid-row-3")[0], "line-with-error");
        domClass.add(query("#grid-row-7")[0], "line-with-error");

        new Messi('Please correct the lines with errors first!!', {
            title: 'Can\'t save',
            titleClass: 'anim error',
            modal: true
        });
    }


    /***********************************************************
     * pretiffy organizes and refreshes data onto the grid
     ***********************************************************/
    function doPrettify(e) {
        window._data_index.sort();

        var result = [];
        var command = null;

        //Clean project commands
        for (var i = 0; i < window._data.length; i++) {
            if (window._data[i].project.indexOf(",") !== -1) {
                command = window._data[i].project.split(",")[0];
                if (command === "t1" || command === "T1") {
                    createT1();
                    break;
                };
                if (command === "t2" || command === "T2") {
                    createT2();
                    break;
                };
                if (command === "excel" || command === "EXCEL") {
                    createFromExcel();
                    break;
                };
                window._data[i].project = window._data[i].project.split(",")[1];
            };
        };

        window._data_index.forEach(function(key) {
            for (var i = 0; i < window._data.length; i++) {
                if (key === window._data[i].project) {
                    result.push(window._data[i]);
                    break;
                };
            };
        })

        window._data = result.concat();

        // correct the ID's
        for (var i = 0; i < window._data.length; i++) {
            window._data[i].id = i;
        };

        grid.refresh()
        grid.renderArray(window._data);
        doIndentation(window._data);
    }

    /***********************************************************
     * creates dummy data
     ***********************************************************/
    function createData() {
        _data.push(grid_line(0, "NEW"));

        _data.push(grid_line(1, "P", "CS/001166", null, "Special Project", "ZEGY", "50000600",
            "50000600", true, "Timecharge", "T,M,E,S", null));
        _data.push(grid_line(2, "W", "CS/001166-10", "CS/001166", "WBS 1", "ZEGY", "50000600",
            "50000600", true, "Timecharge", "T,M,E,S", null));
        _data.push(grid_line(3, "W", "CS/001166-20", "CS/001166-10", "tunnel", "GRAD", "52345600",
            "52345600", true, "Timecharge", "M,E", null));
        _data.push(grid_line(4, "W", "CS/001166-20-01", "CS/001166-20", "Initial planning", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(5, "W", "CS/001166-20-01-01", "CS/001166-20-01", "2nd stage", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(6, "A", "CS/001166-20-01-01-01", "CS/001166-20-01-01", "The activity", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(7, "W", "CS/001166-30", "CS/001166-20", "XPTO wbs", "GRIS", "54668800",
            "54668800", true, "Timecharge", "T", "xpto reference"));
        _data.push(grid_line(8, "A", "CS/001166-30-01", "CS/001166-30", "Another activity", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(9, "W", "CS/001166-40", "CS/001166", "WBS nr.4", "GRIS", "54668800",
            "54668800", true, "Timecharge", "T,M", "no ref"));
    }


    /***********************************************************
     * creates dummy template data T1
     ***********************************************************/
    function createT1() {
        var gridSize = _data.length;

        _data.push(grid_line(gridSize++, "W", "CS/001166-05", "CS/001166", "T1 TEMPLATE WBS", "ZEGY", "50000600",
            "50000600", true, "Timecharge", "T,M,E,S", null));
        _data.push(grid_line(gridSize++, "W", "CS/001166-05-01", "CS/001166-05", "T1 TEMPLATE WBS", "GRAD", "52345600",
            "52345600", true, "Timecharge", "M,E", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-05-01-01", "CS/001166-05-01", "T1 TEMPLATE ACTIVITY", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
    }

    /***********************************************************
     * creates dummy template data T2
     ***********************************************************/
    function createT2() {
        var gridSize = _data.length;

        _data.push(grid_line(gridSize++, "W", "CS/001166-35", "CS/001166", "T2 TEMPLATE WBS", "ZEGY", "50000600",
            "50000600", true, "Timecharge", "T,M,E,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-01", "CS/001166-35", "Activity nr.1 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-02", "CS/001166-35", "Activity nr.2 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-03", "CS/001166-35", "Activity nr.3 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-04", "CS/001166-35", "Activity nr.4 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-05", "CS/001166-35", "Activity nr.5 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-06", "CS/001166-35", "Activity nr.6 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-07", "CS/001166-35", "Activity nr.7 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-08", "CS/001166-35", "Activity nr.8 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-09", "CS/001166-35", "Activity nr.9 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-10", "CS/001166-35", "Activity nr.10 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-11", "CS/001166-35", "Activity nr.11 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-12", "CS/001166-35", "Activity nr.12 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-13", "CS/001166-35", "Activity nr.13 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-14", "CS/001166-35", "Activity nr.14 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
        _data.push(grid_line(gridSize++, "A", "CS/001166-35-15", "CS/001166-35", "Activity nr.15 from T2 template", "GRAD", "52000020",
            "52000020", false, "Fixed fee", "M,S", null));
    }


    /***********************************************************
     * creates dummy data from Excel
     ***********************************************************/
    function createFromExcel() {
        var gridSize = _data.length;

        _data.push(grid_line(gridSize++, "W", "CS/001166-15", "CS/001166", "New WBS from Excel", "NA", "50000600",
            "50000600", true, "Timecharge", "T,M", "Excel document"));
        _data.push(grid_line(gridSize++, "W", "CS/001166-15-01", "CS/001166-15", "New WBS from Excel", "NA", "50000600",
            "50000600", true, "Timecharge", "T,M", "Excel document"));
        _data.push(grid_line(gridSize++, "W", "CS/001166-15-02", "CS/001166-15", "New WBS from Excel", "NA", "50000600",
            "50000600", true, "Timecharge", "T,M", "Excel document"));
        _data.push(grid_line(gridSize++, "W", "CS/001166-15-03", "CS/001166-15", "New WBS from Excel", "NA", "50000600",
            "50000600", true, "Timecharge", "T,M", "Excel document"));

        _data.push(grid_line(gridSize++, "W", "CS/001166-14-01", "CS/001166-14", "New WBS 14 from Excel", "NA", "50000600",
            "50000600", true, "Timecharge", "T,M", "Excel document"));
        _data.push(grid_line(gridSize++, "W", "CS/001166-14", "CS/001166", "New WBS 14 from Excel", "NA", "50000600",
            "50000600", true, "Timecharge", "T,M", "Excel document"));

        _data.push(grid_line(gridSize++, "W", "CS/001166-13", "CS/001166", "DELETE THIS ONE!!", "NA", "50000600",
            "50000600", true, "Timecharge", "T,M", "Excel document"));
    }


    /***********************************************************
     * this function is used to create single lines
     ***********************************************************/
    function grid_line(id, line_type, project, parent_project, project_description, profit_centre,
        project_manager, project_director, billable, fee_type, itemized_for, client_ref) {

        var obj = {};

        var parent_spacer = 0;

        for (var i = 0; i < _data.length; i++) {
            if (_data[i].project === parent_project) {
                parent_spacer = _data[i].spacer;
                break;
            };
        };

        obj.id = id; // ex: 1
        obj.line_type = line_type; // P = project, W = WBS, A = Activity
        obj.project = project; // ex: CS/001166-20
        obj.project_description = project_description; // ex: Initial planning
        obj.profit_centre = profit_centre; // ex: GRIS
        obj.project_manager = project_manager; // ex: 52345600
        obj.project_director = project_director; // ex: 52345600
        obj.billable = billable; // true/false
        obj.fee_type = fee_type; // Timecharge/Fixed Fee
        obj.itemized_for = itemized_for; // ex: T, M, E, S
        obj.client_ref = client_ref; // ex: 13221

        //set spacer
        if (parent_project && parent_project.length < project.length) {
            obj.spacer = parent_spacer + _TAB_SIZE; //this is used for the indentation TAB size
        } else {
            obj.spacer = parent_spacer;
        }

        if (line_type !== "NEW") {
            window._data_index.push(project);
        };

        return obj;
    }

    /***********************************************************
     * prepares the columnSet for the grid
     ***********************************************************/
    function getColumnSets(set) {
        if (set === 2) {
            return [
                [
                    [{
                        label: 'Project',
                        // field: 'project',
                        children: [{
                            label: 'Activity ID',
                            field: 'project',
                            editor: TextBox,
                            editOn: 'dblclick',
                        }]
                    }]
                ],
                [
                    [{
                        label: '',
                        field: 'line_type',
                        editor: TextBox,
                        editOn: 'click',
                        formatter: function(type) {
                            if (type === "NEW") {
                                return '<img src="img/new.png" title="new" alt="new">';
                            };
                            if (type === "P") {
                                return '<img src="img/project.png" title="project" alt="project">';
                            };
                            if (type === "W") {
                                return '<img src="img/wbs.png" title="wbs" alt="wbs">';
                            };
                            if (type === "A") {
                                return '<img src="img/activity.png" title="activity" alt="activity">';
                            };
                        }
                    }, {
                        label: 'Project Description',
                        // field: 'project_description',
                        children: [{
                            label: 'Activity field 1',
                            field: 'project_description',
                            editor: TextBox,
                            editOn: 'click'
                        }]
                    }, {
                        label: 'Profit Centre',
                        // field: 'profit_centre',
                        children: [{
                            label: 'Activity field 2',
                            field: 'profit_centre',
                            editor: TextBox,
                            editOn: 'click'
                        }]
                    }, {
                        label: 'Project Manager',
                        // field: 'project_manager',
                        children: [{
                            label: 'Activity field 3',
                            field: 'project_manager',
                            editor: TextBox,
                            editOn: 'click'
                        }]
                    }, {
                        label: 'Project Director',
                        // field: 'project_director',
                        children: [{
                            label: 'Activity field 4',
                            field: 'project_director',
                            editor: TextBox,
                            editOn: 'click'
                        }]
                    }, {
                        label: 'Billable',
                        // field: 'billable',
                        children: [{
                            label: 'Activity field 5',
                            field: 'billable',
                            editor: TextBox,
                            editOn: 'click'
                        }]
                    }, {
                        label: 'Fee Type',
                        // field: 'fee_type',
                        children: [{
                            label: 'Activity field 6',
                            field: 'fee_type',
                            editor: TextBox,
                            editOn: 'click'
                        }]
                    }, {
                        label: 'Use itemized billing for',
                        // field: 'itemized_for',
                        children: [{
                            label: 'Activity field 7',
                            field: 'itemized_for',
                            editor: TextBox,
                            editOn: 'click'
                        }]
                    }, {
                        label: 'Client Ref',
                        field: 'client_ref',
                        children: [{
                            label: 'Activity field 8',
                            field: 'client_ref',
                            editor: TextBox,
                            editOn: 'click'
                        }]
                    }]
                ]
            ];
        }
    }

});
