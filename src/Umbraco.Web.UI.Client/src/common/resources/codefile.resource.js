﻿/**
    * @ngdoc service
    * @name umbraco.resources.codefileResource
    * @description Loads in data for files that contain code such as js scripts, partial views and partial view macros
    **/
function codefileResource($q, $http, umbDataFormatter, umbRequestHelper) {

    return {

        /**
         * @ngdoc method
         * @name umbraco.resources.codefileResource#getByPath
         * @methodOf umbraco.resources.codefileResource
         *
         * @description
         * Gets a codefile item with a given path
         *
         * ##usage
         * <pre>
         * codefileResource.getByPath('scripts', 'oooh-la-la.js')
         *    .then(function(codefile) {
         *        alert('its here!');
         *    });
         * </pre>
         * 
         * <pre>
         * codefileResource.getByPath('partialView', 'Grid%2fEditors%2fBase.cshtml')
         *    .then(function(codefile) {
         *        alert('its here!');
         *    });
         * </pre>
         *
         * @param {type} the type of script (partialView, partialViewMacro, script)
         * @param {virtualpath} the virtual path of the script
         * @returns {Promise} resourcePromise object.
         *
         */
        getByPath: function (type, virtualpath) {

            return umbRequestHelper.resourcePromise(
               $http.get(
                   umbRequestHelper.getApiUrl(
                       "codeFileApiBaseUrl",
                       "GetByPath",
                       [{ type: type }, {virtualPath: virtualpath }])),
               "Failed to retrieve data for " + type + " from virtual path " + virtualpath);
        },

        /**
         * @ngdoc method
         * @name umbraco.resources.codefileResource#getByAlias
         * @methodOf umbraco.resources.codefileResource
         *
         * @description
         * Gets a template item with a given alias
         *
         * ##usage
         * <pre>
         * codefileResource.getByAlias("upload")
         *    .then(function(template) {
         *        alert('its here!');
         *    });
         * </pre>
         *
         * @param {String} alias Alias of template to retrieve
         * @returns {Promise} resourcePromise object.
         *
         */
        getByAlias: function (alias) {

            return umbRequestHelper.resourcePromise(
               $http.get(
                   umbRequestHelper.getApiUrl(
                       "templateApiBaseUrl",
                       "GetByAlias",
                       [{ alias: alias }])),
               "Failed to retrieve data for template with alias: " + alias);
        },

        /**
         * @ngdoc method
         * @name umbraco.resources.codefileResource#deleteByPath
         * @methodOf umbraco.resources.codefileResource
         *
         * @description
         * Deletes a codefile with a given type & path
         *
         * ##usage
         * <pre>
         * codefileResource.deleteByPath('scripts', 'oooh-la-la.js')
         *    .then(function() {
         *        alert('its gone!');
         *    });
         * </pre>
         * 
         * <pre>
         * codefileResource.deleteByPath('partialView', 'Grid%2fEditors%2fBase.cshtml')
         *    .then(function() {
         *        alert('its gone!');
         *    });
         * </pre>
         *
         * @param {type} the type of script (partialView, partialViewMacro, script)
         * @param {virtualpath} the virtual path of the script
         * @returns {Promise} resourcePromise object.
         *
         */
        deleteByPath: function (type, virtualpath) {
            return umbRequestHelper.resourcePromise(
                $http.post(
                    umbRequestHelper.getApiUrl(
                        "codeFileApiBaseUrl",
                        "Delete",
                        [{ type: type }, { virtualPath: virtualpath}])),
                "Failed to delete item " + id);
        },

        /**
         * @ngdoc method
         * @name umbraco.resources.codefileResource#save
         * @methodOf umbraco.resources.codefileResource
         *
         * @description
         * Saves or update a codeFile
         * 
         * ##usage
         * <pre>
         * codefileResource.save(codeFile)
         *    .then(function(codeFile) {
         *        alert('its saved!');
         *    });
         * </pre>
         *
         * @param {Object} template object to save
         * @returns {Promise} resourcePromise object.
         *
         */
        save: function (codeFile) {
            return umbRequestHelper.resourcePromise(
                 $http.post(
                     umbRequestHelper.getApiUrl(
                         "codeFileApiBaseUrl",
                         "PostSave"),
                         codeFile),
                "Failed to save data for code file " + codeFile.virtualPath);
        },

        /**
         * @ngdoc method
         * @name umbraco.resources.codefileResource#getSnippets
         * @methodOf umbraco.resources.codefileResource
         *
         * @description
         * Gets code snippets for a given file type
         * 
         * ##usage
         * <pre>
         * codefileResource.getSnippets("partialViews")
         *    .then(function(snippets) {
         *        alert('its here!');
         *    });
         * </pre>
         *
         * @param {string} file type: (partialViews, partialViewMacros)
         * @returns {Promise} resourcePromise object.
         *
         */
        getSnippets: function (fileType) {
            return umbRequestHelper.resourcePromise(
                 $http.get(
                     umbRequestHelper.getApiUrl(
                         "codeFileApiBaseUrl",
                         "GetSnippets?type=" + fileType )),
                "Failed to get snippet for" + fileType);
        },

        /**
         * @ngdoc method
         * @name umbraco.resources.codefileResource#getScaffold
         * @methodOf umbraco.resources.codefileResource
         *
         * @description
         * Returns a scaffold of an empty codefile item.
         * 
         * The scaffold is used to build editors for code file editors that has not yet been populated with data.
         * 
         * ##usage
         * <pre>
         * codefileResource.getScaffold("partialViews", "Breadcrumb")
         *    .then(function(data) {
         *        alert('its here!');
         *    });
         * </pre>
         *
         * @param {string} File type: (scripts, partialViews, partialViewMacros).
         * @param {string} Snippet name (Ex. Breadcrumb).
         * @returns {Promise} resourcePromise object.
         *
         */

        getScaffold: function (type, snippetName) {
            return umbRequestHelper.resourcePromise(
                 $http.get(
                     umbRequestHelper.getApiUrl(
                         "codeFileApiBaseUrl",
                         "GetScaffold?type=" + type + "&snippetName=" + snippetName)),
                "Failed to get scaffold for" + type);
        }

    };
}

angular.module("umbraco.resources").factory("codefileResource", codefileResource);
