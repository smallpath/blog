/* eslint-disable */
import { EventEmitter } from 'events'

import vue from 'vue';
import VueResource from 'vue-resource'
vue.use(VueResource)
// vue.http.options.emulateJSON = true;

const host = typeof location === 'undefined' ? 'http://localhost:8080' : '';

const blogAPI = `${host}/proxyPrefix/api/post`;

const tagAPI = `${host}/proxyPrefix/api/tag`;

const categoryAPI = `${host}/proxyPrefix/api/category`;

const postTagAPI = `${host}/proxyPrefix/api/postTag`;

const postCateAPI = `${host}/proxyPrefix/api/postCategory`;

const aboutAPI = `${host}/proxyPrefix/api/post?title=关于`

const store = new EventEmitter()

const perPage = 10;

export default store

store.fetchPage = (queryJSON) => {
  let keys = Object.keys(queryJSON);
  let values = Object.keys(queryJSON).map(value=>queryJSON[value]);
  return vue.resource(blogAPI+'{?keys,values}').get({
      keys,
      values,
  }).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}

store.fetchOption = () => {
  return vue.http.get(`/proxyPrefix/api/option`)
    .then((response) => {
      return response.body;
    }, (err) => {
      console.log(err)
    })
}

store.fetchOptionByJSON = (queryJSON) => {
  let keys = Object.keys(queryJSON);
  let values = Object.keys(queryJSON).map(value=>queryJSON[value]);
  return vue.resource(`/proxyPrefix/api/option/{?keys,values,count}`).get({
      keys ,
      values,
  }).then((response) => {
      return response.body;
    }, (err) => {
      console.log(err)
    })
}

store.fetchBlogByID = (id, page = 0 ) => {
  return vue.resource(blogAPI+'/{id}').get({
      id
  }).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}

store.fetchBlogCount = (queryJSON, page = 0 ) => {
  let keys = Object.keys(queryJSON);
  let values = Object.keys(queryJSON).map(value=>queryJSON[value]);
  let temp = vue.resource(blogAPI+'/{?keys,values,count}')
  return vue.resource(blogAPI+'/{?keys,values,count}').get({
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
 
store.fetchBlogByPage = (queryJSON, page) => {
  let keys = Object.keys(queryJSON);
  let values = Object.keys(queryJSON).map(value=>queryJSON[value]);
  console.log('store.fetchBlogByPage',page)
  return vue.resource(blogAPI+'/{?keys,values,limit,skip,sort}').get({
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


store.fetchPostByPathName = (pathName) => {
  return vue.resource('/proxyPrefix/api/post/{?keys,values}').get({
    keys:['pathName'],
    values:[pathName],
  }).then((response) => {
    return response.body[0];
  }, (err) => {
    console.log(err)
  })
}

store.fetchPrevPostByPathName = (id) => {
  let api = blogAPI + '/' + id + '?prev=1';
  return vue.http.get(api).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}

store.fetchNextPostByPathName = (id) => {
  let api = blogAPI + '/' + id + '?next=1';
  return vue.http.get(api).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}



store.fetchAllBlog = () => {
  return vue.resource(blogAPI+'/{?keys,values,sort}').get({
    keys: ['type'],
    values: ['0'],
    sort: "1",
  }).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}


store.fetchTags = () => {
  return vue.http.get(tagAPI).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}

store.fetchTagsByPostID = (queryJSON) => {
  let keys = Object.keys(queryJSON);
  let values = Object.keys(queryJSON).map(value=>queryJSON[value]);
  return vue.resource(postTagAPI+'{?keys,values}').get({
      keys,
      values,
  }).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}


store.fetchPostTags = () => {
  return vue.http.get(postTagAPI).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}


store.fetchCatesByPostID = (queryJSON) => {
  let keys = Object.keys(queryJSON);
  let values = Object.keys(queryJSON).map(value=>queryJSON[value]);
  return vue.resource(postCateAPI+'{?keys,values}').get({
      keys,
      values,
  }).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}


store.fetchCates = () => {
  return vue.http.get(categoryAPI).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}



