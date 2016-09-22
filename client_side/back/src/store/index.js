/* eslint-disable */
import { EventEmitter } from 'events'

const blogAPI = `/proxyPrefix/api/post`;

const tagAPI = `/proxyPrefix/api/tag`;

const postTagAPI = `/proxyPrefix/api/postTag`;

const aboutAPI = `/proxyPrefix/api/post/57dbe47c2993f70dc6d6b12c`

const root = `/proxyPrefix/api`;

const store = new EventEmitter()

const perPage = 10;

export default store


store.newTag = (vue, name) => {
  if (typeof name == 'undefined' || name==""){
      return;
  }
  return vue.$http.post(`${root}/tag`,{
    name,   
  }).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}

store.newCate = (vue, name) => {
  if (typeof name == 'undefined' || name==""){
      return;
  }
  return vue.$http.post(`${root}/category`,{
    name,   
  }).then((response) => {
    return response.body;
  }, (err) => {
    console.log(err)
  })
}

store.fetchOption = (vue) => {
  return vue.$http.get(`${root}/option`)
    .then((response) => {
        return response.body;
    }, (err) => {
        console.log(err)
    })
}

store.patchOption = (vue,id, json) => {
  return vue.$http.patch(`${root}/option/${id}`,json)
    .then((response) => {
        return response.body;
    }, (err) => {
        console.log(err)
    })
}

store.fetchUser = (vue) => {
  return vue.$http.get(`${root}/user`)
    .then((response) => {
        return response.body;
    }, (err) => {
        console.log(err)
    })
}

store.patchUser = (vue,id, json) => {
  return vue.$http.patch(`${root}/user/${id}`,json)
    .then((response) => {
        return response.body;
    }, (err) => {
        console.log(err)
    })
}

store.fetchTag = (vue) => {
  return vue.$http.get(`${root}/tag`)
    .then((response) => {
        return response.body;
    }, (err) => {
        console.log(err)
    })
}

store.fetchTagById = (vue, id) => {
  return vue.$http.get(`${root}/tag/${id}`)
    .then((response) => {
        return response.body;
    }, (err) => {
        console.log(err)
    })
}

store.patchTag = (vue,id, json) => {
  return vue.$http.patch(`${root}/tag/${id}`,json)
    .then((response) => {
        return response.body;
    }, (err) => {
        console.log(err)
    })
}

store.deleteTag = (vue, id) => {
  return vue.$http.delete(`${root}/tag/${id}`)
    .then((response) => {
        return response.body;
    }, (err) => {
        console.log(err)
    })
}


store.fetchCate= (vue) => {
  return vue.$http.get(`${root}/category`)
    .then((response) => {
        return response.body;
    }, (err) => {
        console.log(err)
    })
}

store.fetchCateById = (vue, id) => {
  return vue.$http.get(`${root}/category/${id}`)
    .then((response) => {
        return response.body;
    }, (err) => {
        console.log(err)
    })
}

store.patchCate = (vue,id, json) => {
  return vue.$http.patch(`${root}/category/${id}`,json)
    .then((response) => {
        return response.body;
    }, (err) => {
        console.log(err)
    })
}

store.deleteCate = (vue, id) => {
  return vue.$http.delete(`${root}/category/${id}`)
    .then((response) => {
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

store.fetchTagsByPostID = (vue, queryJSON) => {
  let keys = Object.keys(queryJSON);
  let values = Object.keys(queryJSON).map(value=>queryJSON[value]);
  return vue.$resource(postTagAPI+'{?keys,values}').get({
      keys,
      values,
  }).then((response) => {
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


