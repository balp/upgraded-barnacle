import { Mongo } from 'meteor/mongo';

export const Facts = new Mongo.Collection('facts');

if (Meteor.isServer) {
    Meteor.publish('facts', function factsPublication() {
        return Facts.find();
    });
    Meteor.publish('facts.person', function (nameId) {
        new SimpleSchema({nameId: {type: String}}).validate({nameId});
        return Facts.find({"ReferenceID": nameId});
    })
}
