var EventModel = require('../models/eventModel.js');

/**
 * eventController.js
 *
 * @description :: Server-side logic for managing events.
 */
module.exports = {

    /**
     * eventController.list()
     */
    list: function (req, res) {
        EventModel.find(function (err, events) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting event.',
                    error: err
                });
            }

            return res.json(events);
        });
    },

    /**
     * eventController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        EventModel.findOne({_id: id}, function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting event.',
                    error: err
                });
            }

            if (!event) {
                return res.status(404).json({
                    message: 'No such event'
                });
            }

            return res.json(event);
        });
    },

    /**
     * eventController.create()
     */
    create: function (req, res) {
        var event = new EventModel({
			nama_event : req.body.nama_event,
			tanggal_event : req.body.tanggal_event,
			tempat_event : req.body.tempat_event,
			deskripsi : req.body.deskripsi,
			gambar : req.body.gambar,
			link_eksternal : req.body.link_eksternal
        });

        event.save(function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating event',
                    error: err
                });
            }

            return res.status(201).json(event);
        });
    },

    /**
     * eventController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        EventModel.findOne({_id: id}, function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting event',
                    error: err
                });
            }

            if (!event) {
                return res.status(404).json({
                    message: 'No such event'
                });
            }

            event.nama_event = req.body.nama_event ? req.body.nama_event : event.nama_event;
			event.tanggal_event = req.body.tanggal_event ? req.body.tanggal_event : event.tanggal_event;
			event.tempat_event = req.body.tempat_event ? req.body.tempat_event : event.tempat_event;
			event.deskripsi = req.body.deskripsi ? req.body.deskripsi : event.deskripsi;
			event.gambar = req.body.gambar ? req.body.gambar : event.gambar;
			event.link_eksternal = req.body.link_eksternal ? req.body.link_eksternal : event.link_eksternal;
			
            event.save(function (err, event) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating event.',
                        error: err
                    });
                }

                return res.json(event);
            });
        });
    },

    /**
     * eventController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        EventModel.findByIdAndRemove(id, function (err, event) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the event.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
