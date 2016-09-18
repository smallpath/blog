/* eslint-disable */
import { EventEmitter } from 'events'

const blogAPI = `/proxyPrefix/api/post`;

const tagAPI = `/proxyPrefix/api/tag`;

const postTagAPI = `/proxyPrefix/api/postTag`;

const aboutAPI = `/proxyPrefix/api/post/57dbe47c2993f70dc6d6b12c`

const store = new EventEmitter()

const perPage = 10;

export default store

store.fetchAbout = (vue) => {
  return vue.$http.get(aboutAPI).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}

store.fetchBlogByID = (vue, id, page = 0 ) => {
  return vue.$resource(blogAPI+'/{id}').get({
      id
  }).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}

store.fetchBlogCount = (vue, queryJSON, page = 0 ) => {
  let keys = Object.keys(queryJSON);
  let values = Object.keys(queryJSON).map(value=>queryJSON[value]);
  console.log(keys,values);
  return vue.$resource(blogAPI+'/{?keys,values,count}').get({
      keys ,
      values,
      count: 1,
  }).then((response) => {
    let totalPage = Math.ceil(parseInt(response.body)/perPage);
    return totalPage;
  }, (err) => {
    console.log(err)
  })
}
 
store.fetchBlogByPage = (vue, queryJSON, page = 0) => {
  let keys = Object.keys(queryJSON);
  let values = Object.keys(queryJSON).map(value=>queryJSON[value]);
  console.log(keys,values);
  return vue.$resource(blogAPI+'/{?keys,values,limit,skip,sort}').get({
      keys ,
      values,
      limit: perPage,
      skip: page*perPage,
      sort: "1"
  }).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}


store.fetchPostByPathName = (vue, pathName) => {
  return vue.$resource('/proxyPrefix/api/post/{?keys,values}').get({
    keys:['pathName'],
    values:[pathName],
  }).then((response) => {
    return response.body[0];
  }, (err) => {
    console.log(err)
  })
}

store.fetchPrevPostByPathName = (vue, id) => {
  let api = blogAPI + '/' + id + '?prev=1';
  return vue.$http.get(api).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}

store.fetchNextPostByPathName = (vue, id) => {
  let api = blogAPI + '/' + id + '?next=1';
  return vue.$http.get(api).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}



store.fetchAllBlog = (vue) => {
  return vue.$resource(blogAPI+'/{?keys,values,sort}').get({
    keys: ['type'],
    values: ['0'],
    sort: "1",
  }).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}


store.fetchTags = (vue) => {
  return vue.$http.get(tagAPI).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}

store.fetchPostTags = (vue) => {
  return vue.$http.get(postTagAPI).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}


