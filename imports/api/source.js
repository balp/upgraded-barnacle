import { Mongo } from 'meteor/mongo';

export const Sources = new Mongo.Collection('sources');

if (Meteor.isServer) {
    Meteor.publish('sources', function sourcesPublication() {
        return Sources.find();
    });
}
