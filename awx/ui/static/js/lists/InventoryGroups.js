/*********************************************
 *  Copyright (c) 2014 AnsibleWorks, Inc.
 *
 *  InventorySummary.js 
 *
 *  Summary of groups contained within an inventory
 * 
 */
angular.module('InventoryGroupsDefinition', [])
    .value(
    'InventoryGroups', {

        name: 'groups',
        iterator: 'group',
        editTitle: '{{ inventory_name | capitalize }}',
        showTitle: false,
        well: true,
        index: false,
        hover: true,
        hasChildren: true,
        filterBy: '\{ show: true \}',
        'class': 'table-condensed',
        
        fields: {
            name: {
                label: 'Groups',
                key: true,
                ngClick: "\{\{ 'showHosts(' + group.id + ',' + group.group_id + ')' \}\}",
                ngClass: "group.selected_class",
                hasChildren: true,
                columnClass: 'col-lg-9',
                nosort: true
                },
            source: {
                label: 'Source',
                searchType: 'select',
                searchOptions: [
                    { name: "ec2", value: "ec2" },
                    { name: "none", value: "" },
                    { name: "rax", value: "rax" }],
                sourceModel: 'inventory_source',
                sourceField: 'source',
                searchOnly: true
                },
            has_external_source: {
                label: 'Has external source?', 
                searchType: 'in', 
                searchValue: 'ec2,rax',
                searchOnly: true,
                sourceModel: 'inventory_source',
                sourceField: 'source'
                },
            has_active_failures: {
                label: 'Has failed hosts?',
                searchSingleValue: true,
                searchType: 'boolean',
                searchValue: 'true',
                searchOnly: true
                },
            last_update_failed: {
                label: 'Update failed?',
                searchType: 'select',
                searchSingleValue: true,
                searchValue: 'failed',
                searchOnly: true,
                sourceModel: 'inventory_source',
                sourceField: 'status'
                }
            },

        actions: {
            
            columnClass: 'col-lg-3',
            
            create: {
                mode: 'all',
                ngClick: "createGroup()",
                ngHide: "groupCreateHide", 
                ngDisabled: 'grpBtnDisabled',
                awToolTip: "Create a new group"
                },
            properties: {
                mode: 'all',
                ngHide: "groupEditHide", 
                ngDisabled: 'grpBtnDisabled',
                awToolTip: "Edit inventory properties" 
                },
            refresh: {
                mode: 'all',
                awToolTip: "Refresh the page",
                ngClick: "refreshGroups()"
                },
            stream: {
                ngClick: "showActivity()",
                awToolTip: "View Activity Stream",
                mode: 'all',
                ngShow: "user_is_superuser"
                },
             help: {
                mode: 'all',
                awToolTip:
                    //"<div style=\"text-align:left;\"><img src=\"/static/img/cow.png\" style=\"width:50px; height:56px; float:left; padding-right:5px;\">" +
                    //"<p>Need help getting started creating your inventory?</p><p>Click here for help.</p></div>",
                    "<div style=\"text-align:left;\"><p>Need help getting started creating your inventory?</p><p>Click here for help.</p></div>",
                ngClick: "showHelp()",
                id: "inventory-summary-help"
                }
            },

        fieldActions: {
            sync_status: {
                mode: 'all',
                ngClick: "viewUpdateStatus(\{\{ group.id \}\})",
                ngShow: "group.id > 1", // hide for all hosts
                awToolTip: "\{\{ group.status_tooltip \}\}",
                ngClass: "group.status_class",
                dataPlacement: "top"
                },
            failed_hosts: {
                mode: 'all',
                awToolTip: "\{\{ group.hosts_status_tip \}\}",
                ngShow: "group.id > 1", // hide for all hosts
                dataPlacement: "top",
                ngClick: "viewFailedHosts(\{\{ group.id \}\})",
                iconClass: "\{\{ 'fa icon-failures-' + group.hosts_status_class \}\}"
                },
            group_update: {
                //label: 'Sync',
                ngClick: 'updateGroup(\{\{ group.id \}\})',
                awToolTip: "\{\{ group.launch_tooltip \}\}",
                ngShow: "group.id > 1", // hide for all hosts
                ngClass: "group.launch_class",
                dataPlacement: "top"
                },
            cancel: {
                //label: 'Cancel',
                ngClick: "cancelUpdate(\{\{ group.id \}\}, '\{\{ group.name \}\}')",
                awToolTip: "Cancel sync process",
                ngClass: "group.cancel_class",
                ngShow: "group.id > 1 && (group.status == 'running' || group.status == 'pending')",
                dataPlacement: "top"
                },
            edit: {
                //label: 'Edit',
                ngClick: "editGroup(\{\{ group.group_id \}\})",
                awToolTip: 'Edit group',
                ngShow: "group.id > 1", // hide for all hosts
                dataPlacement: "top"
                },
            "delete": {
                //label: 'Delete',
                ngClick: "deleteGroup(\{\{ group.id \}\})",
                awToolTip: 'Delete group',
                ngShow: "group.id != 1", // hide for all hosts
                dataPlacement: "top"
                }
            }
    });
            