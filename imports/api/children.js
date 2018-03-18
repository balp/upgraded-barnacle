import { Mongo } from 'meteor/mongo';

export const Children = new Mongo.Collection('children');

if (Meteor.isServer) {
    Meteor.publish('children', function childrenPublication() {
        return Children.find();
    });
}
