import { Mongo } from 'meteor/mongo';

export const Families = new Mongo.Collection('families');

if (Meteor.isServer) {
    Meteor.publish('families', function familiesPublication() {
        return Families.find();
    });
}
