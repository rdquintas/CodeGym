require([
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dstore/Memory',
    'dstore/Trackable',
    'dgrid/ColumnSet',
    'dgrid/OnDemandGrid',
    'dgrid/extensions/CompoundColumns',
    'dgrid/Selection',
    'dgrid/Keyboard',
    'dgrid/extensions/ColumnResizer',
    'dgrid/extensions/ColumnHider'
], function(declare, lang, on, Memory, Trackable, ColumnSet, OnDemandGrid, CompoundColumns, Selection,
    Keyboard, ColumnResizer, ColumnHider) {
    var store = new(declare([Memory, Trackable]))({
        data: createData()
    });


    var columnSetsSingleRow = [
        [
            [{
                label: 'Column 1 adasasjehfepef adalkdansasdkjn as  X',
                field: 'col1'
                    // width: '20px'
            }]
        ],
        [
            [{
                label: 'Column 2',
                field: 'col2',
                sortable: false
                    // width: '20'
            }, {
                label: 'Column 4',
                field: 'col4'
            }, {
                label: 'Column 3',
                field: 'col3'
            }]
        ]
    ];

    // Instantiate grid


    var grid = new(declare([OnDemandGrid, CompoundColumns, ColumnSet, Selection, Keyboard]))({
        collection: store,
        // columnSets: columnSetsSingleRow
        columnSets: getColumnSets(2)
    }, "grid");


    // var grid = new(declare([OnDemandGrid, ColumnSet]))({
    //         collection: store,
    //         // showHeader: false,
    //         columnSets: columnSetsSingleRow
    //     },
    //     'grid');

    grid.startup();

    // grid.styleColumn("col1", "{'color': '#fff':}");

    function createData() {
        var data = [];
        var column;
        var i;
        for (i = 0; i < 5; i++) {
            data.push({});
            for (column in {
                    col1: 1,
                    col2: 1,
                    col3: 1,
                    col4: 1
                }) {
                data[i].id = i;
                if (column === "col1") {
                    data[i][column] = column + '_asd asd asd asdoifowjnfwe wef wefnwefoiwfowfowf asd ads asodjoinj' + (i + 1);
                } else {
                    data[i][column] = column + '_' + (i + 1);
                }
            }
        }
        return data;
    }



    function getColumnSets(set) {
        if (set === 2) {
            return [
                [
                    [{
                        label: 'Columns 1 and 2',
                        field: 'col1'
                    }]
                ],
                [
                    [{
                        label: 'Column 2',
                        field: 'col2'
                    }, {
                        label: 'Column 3',
                        field: 'col3'
                    }, {
                        label: 'Column 4',
                        field: 'col4'
                    }]
                ]
            ];
        } else if (set === 3) {
            return [
                [
                    [{
                        label: 'Columns 1 and 2',
                        children: [{
                            label: 'Column 1',
                            field: 'col1'
                        }, {
                            label: 'Column 2',
                            field: 'col2',
                            sortable: false
                        }]
                    }]
                ],
                [
                    [{
                        label: "Columns 3 and 4",
                        children: [{
                            label: 'Column 3',
                            field: 'col3'
                        }, {
                            label: 'Column 4',
                            field: 'col4'
                        }]
                    }]
                ],
                [
                    [{
                        label: "Columns 4 and 5",
                        children: [{
                            label: 'Column 4',
                            field: 'col4'
                        }, {
                            label: 'Column 5',
                            field: 'col5'
                        }]
                    }]
                ]
            ];
        } else if (set === 4) {
            return [
                [
                    [{
                        label: 'Columns 1 and 2',
                        children: [{
                            label: 'Column 1',
                            field: 'col1'
                        }, {
                            label: 'Column 2',
                            field: 'col2',
                            sortable: false
                        }]
                    }]
                ],
                [
                    [{
                        label: "Columns 4 & 5, 3, 4, 4 & 5",
                        children: [{
                            label: "Columns 4 and 5",
                            children: [{
                                label: 'Column 4',
                                field: 'col4'
                            }, {
                                label: 'Column 5',
                                field: 'col5'
                            }]
                        }, {
                            label: 'Column 3',
                            field: 'col3'
                        }, {
                            label: 'Column 4',
                            field: 'col4'
                        }, {
                            label: "Columns 4 and 5",
                            children: [{
                                label: 'Column 4',
                                field: 'col4'
                            }, {
                                label: 'Column 5',
                                field: 'col5'
                            }]
                        }]
                    }]
                ]
            ];
        } else {
            // Set 1 / default
            return [
                [
                    [{
                        label: 'Columns 1 and 2',
                        children: [{
                            label: 'Column 1',
                            field: 'col1'
                        }, {
                            label: 'Column 2',
                            field: 'col2',
                            sortable: false
                        }]
                    }, {
                        label: 'Column 4',
                        field: 'col4'
                    }]
                ],
                [
                    [{
                        label: 'Column 1',
                        field: 'col1'
                    }, {
                        label: 'Column 4',
                        field: 'col4'
                    }]
                ]
            ];
        }
    }

});
