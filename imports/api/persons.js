import { Mongo } from 'meteor/mongo';

export const Persons = new Mongo.Collection('persons');

if (Meteor.isServer) {
    Meteor.publish('persons', function personsPublication() {
        return Persons.find();
    });
}
