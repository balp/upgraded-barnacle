import { Mongo } from 'meteor/mongo';

export const Names = new Mongo.Collection('names');

if (Meteor.isServer) {
    Meteor.publish('names', function namesPublication() {
        return Names.find();
    });
}
