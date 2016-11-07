/* eslint-disable */
import request from 'axios';

const blogAPI = `/proxyPrefix/api/post`;

const tagAPI = `/proxyPrefix/api/tag`;

const postTagAPI = `/proxyPrefix/api/postTag`;

const aboutAPI = `/proxyPrefix/api/post/57dbe47c2993f70dc6d6b12c`

const root = `/proxyPrefix/api`;

const postCateAPI = `/proxyPrefix/api/postCategory`;

const store = {};

const perPage = 10;

request.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  if (request.method == 'get' && request.url.indexOf('/proxyPrefix/user') == -1 ){
    return config;
  }

  if (token !== null && token !== 'undefined') {
    config.headers['authorization'] = token;
  }

  return config;
}, (error) => Promise.reject(error));

request.interceptors.response.use((response) => {
  if (response.data && response.data.status && response.data.status === 'fail') {
    console.error(response.data.description);
  }
  return response;
}, (error) => Promise.reject(error));

export default store;

function isObject (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Object'
}

function convertObjectToArray (args) {
  return isObject(args) ? Object.keys(args).map((value, index) => {
    let temp = {}
    temp[value] = args[value]
    return temp
  }) : []
}

store.login = (conditions, args) => {
  return request.post(`/proxyPrefix/admin/login`, conditions);
}

store.logout = (conditions, args) => {
  return request.post(`/proxyPrefix/admin/logout`, conditions);
}

store.fetchUpdate = (conditions = {}, args) => {
  return request.get(`/proxyPrefix/api/update?conditions=${JSON.stringify(conditions)}`);
}

store.deleteUpdate = (id) => {
  return request.delete(`/proxyPrefix/api/update/${id}`);
}

// post CRUD

store.fetchBlog = (conditions, args) => {
  return request.get(blogAPI + `?conditions=${JSON.stringify(conditions)}&sort=1`)
  .then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.fetchBlogByID = (id) => {
  return request.get(blogAPI + `/${id}`).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.newBlog = (json) => {
  return request.post(blogAPI, json).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.patchBlog = (id, json) => {
  return request.patch(`${blogAPI}/${id}`, json).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.deleteBlogByID = (id, page = 0) => {
  return request.delete(blogAPI + `/${id}`)
  .then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

// cate CRUD



store.fetchCate = (conditions = {}, arg) => {
  return request.get(`${root}/category?conditions=${JSON.stringify(conditions)}`)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}

store.fetchCateById = (id) => {
  return request.get(`${root}/category/${id}`)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}

store.newCate = (name) => {
  if (typeof name == 'undefined' || name == "") {
    return;
  }
  return request.post(`${root}/category`, {
    name,
  }).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.patchCate = (id, json) => {
  return request.patch(`${root}/category/${id}`, json)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}

store.deleteCate = (id) => {
  return request.delete(`${root}/category/${id}`)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}

// tag CRUD

store.fetchTag = (conditions = {}, args) => {
  return request.get(`${root}/tag?conditions=${JSON.stringify(conditions)}`)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}

store.fetchTagById = (id) => {
  return request.get(`${root}/tag/${id}`)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}

store.newTag = (name) => {
  if (typeof name == 'undefined' || name == "") {
    return;
  }
  return request.post(`${root}/tag`, {
    name,
  }).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.patchTag = (id, json) => {
  return request.patch(`${root}/tag/${id}`, json)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}

store.deleteTag = (id) => {
  return request.delete(`${root}/tag/${id}`)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}

// version CRUD


store.fetchVersion = (conditions = {}, args) => {
  return request.get(`${root}/update?conditions=${JSON.stringify(conditions)}`)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}

store.fetchVersionById = (id) => {
  return request.get(`${root}/update/${id}`)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}

store.newVersion = (json) => {
  return request.post(`${root}/update`, json)
  .then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.patchVersion = (id, json) => {
  return request.patch(`${root}/update/${id}`, json)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}

store.deleteVersion = (id) => {
  return request.delete(`${root}/update/${id}`)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}

// option CRUD

store.fetchOption = (conditions = {}, args) => {
  return request.get(`${root}/option?conditions=${JSON.stringify(conditions)}`)
  .then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.patchOption = (id, json) => {
  return request.patch(`${root}/option/${id}`, json)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}

// user CRUD

store.fetchUser = () => {
  return request.get(`${root}/user`)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}

store.patchUser = (id, json) => {
  return request.patch(`${root}/user/${id}`, json)
    .then((response) => {
      return response.data;
    }, (err) => {
      console.log(err)
    })
}


// many to many

store.deleteTagsByPostID = (id) => {
  return request.delete(postTagAPI + '/' + id).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.deleteCateByPostID = (id) => {
  return request.delete(postCateAPI + '/' + id).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

// postTag
store.fetchPostTags = () => {
  return request.get(postTagAPI).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.fetchPostTagsByID = (conditions) => {
  return request.get(postTagAPI + `?conditions=${JSON.stringify(conditions)}`)
  .then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

// postCate

store.fetchPostCate = () => {
  return request.get(postCateAPI).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.fetchPostCateByID = (conditions) => {
  return request.get(postCateAPI +  `?conditions=${JSON.stringify(conditions)}`)
  .then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.deletePostTags = (id) => {
  return request.delete(`${postTagAPI}/${id}`).then((response) => {
    return response;
  }, (err) => {
    console.log(err)
  })
}

store.addPostTags = (json) => {
  return request.post(`${postTagAPI}`, json).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}

store.deletePostCates = (id) => {
  return request.delete(`${postCateAPI}/${id}`).then((response) => {
    return response;
  }, (err) => {
    console.log(err)
  })
}

store.addPostCates = (json) => {
  return request.post(`${postCateAPI}`, json).then((response) => {
    return response.data;
  }, (err) => {
    console.log(err)
  })
}
