const paiementRepository = require('./repository/paiement-repository');

module.exports = {
    databaseConnection: require('./connection'),
    paiementRepository: require('./repository/paiement-repository'),
}