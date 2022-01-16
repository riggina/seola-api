var PortofolioModel = require('../models/portofolioModel.js');

/**
 * PortofolioController.js
 *
 * @description :: Server-side logic for managing portofolio.
 */
module.exports = {

    /**
     * tugas_terkumpulController.list()
     */
    list: function (req, res) {
        PortofolioModel.find(function (err, portofolios) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting portofolios.',
                    error: err
                });
            }

            return res.json(portofolios);
        });
    },

};