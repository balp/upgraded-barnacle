import { Mongo } from 'meteor/mongo';

export const Facts = new Mongo.Collection('facts');

if (Meteor.isServer) {
    Meteor.publish('facts', function factsPublication() {
        return Facts.find();
    });
}
