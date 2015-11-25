# ShittyLife

The [Sails](http://sailsjs.org) API for VDM

## Installation

``` bash
$ git clone https://github.com/nicowww/ShittyLife.git && cd ShittyLife

$ npm install
```

## Start app

**Create a database:**

``` bash
$ node populate.js
```

**Start app:**
``` bash
$ sails lift
```

## Usage
Get all posts<br>
localhost:1337/posts

Get post by id<br>
localhost:1337/posts/id

Get posts by author name<br>
localhost:1337/posts?author=name

Get posts by date (dd/mm/YYYY HH:mm)<br>
localhost:1337/posts?date=datetime

Get posts by date and author name<br>
localhost:1337/posts?date=datetime&author=name
