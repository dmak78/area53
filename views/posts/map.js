function(doc) {
  if (doc.type && doc.type == 'post') {
    emit(doc._id, doc);
  }
};