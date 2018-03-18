import { Mongo } from 'meteor/mongo';

export const Notes = new Mongo.Collection('notes');

if (Meteor.isServer) {
    Meteor.publish('notes', function notesPublication() {
        return Notes.find();
    });
}
