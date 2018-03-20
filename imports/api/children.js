import { Mongo } from 'meteor/mongo';

export const Children = new Mongo.Collection('children');

if (Meteor.isServer) {
    Meteor.publish('children', function childrenPublication() {
        return Children.find();
    });
    Meteor.publish('children.person', function (nameId) {
        new SimpleSchema({nameId: {type: String}}).validate({nameId});
        return Children.find({"PersonID": nameId});
    })
}
