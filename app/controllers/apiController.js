/**
 * Created by Rajesh on 9/22/19.
 */

require('dotenv').config();
const url = require('url');
const request = require('request');

const baseUrl = process.env.A2I_COMPILED_INFO_API ? process.env.A2I_COMPILED_INFO_API : "http://10.100.222.160:8080/a2i/";
const delay = (process.env.ENVIRONMENT == "production") ? 0 : 1000;

module.exports = {
    searchToAPI: function (req, res, next) {
        var url_parts = url.parse(req.url, true);
        var params = url_parts.query;

        var resp = {
            success : true,
            status  : 200
        };

        const options = {
            url: baseUrl + '/' + encodeURI(params.category) + '?location_name=' + encodeURI(params.location) + '&location_type=' + encodeURI(params.area) + '&page=' + encodeURI(params.page),
            method: 'GET'
        };

        setTimeout(function () {
            request(options, function (err, response, body) {
                if(err)
                    return next(err);

                if(body){
                    try {
                        a = JSON.parse(body);
                        resp.results = a;
                    } catch(e) {
                        console.log(e); // error in the above string (in this case, yes)!
                        resp.success = false;
                        resp.status = 501;
                        resp.message = "Response can not be parsed at this moment"
                    }
                }

                res.json(resp);
            });
        }, delay);
    }
};