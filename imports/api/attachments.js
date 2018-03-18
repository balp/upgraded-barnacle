import { Mongo } from 'meteor/mongo';

export const Attachments = new Mongo.Collection('attachments');

if (Meteor.isServer) {
    Meteor.publish('attachments', function attachmentsPublication() {
        return Attachments.find();
    });
}
