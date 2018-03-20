import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Names = new Mongo.Collection('names');

if (Meteor.isServer) {
    Meteor.publish('names', function namesPublication() {
        return Names.find();
    });
    Meteor.publish('names.person', function (nameId) {
        new SimpleSchema({nameId: {type: String}}).validate({nameId});
        return Names.find({"PersonID": nameId});
    })
}
