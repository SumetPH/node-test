# Document

## Key

- /key.js

## Routes

- api/v1

  - user

    - /register
      - method: post
      - body: email:string, username:string, password:string
      - res: { msg:string }
    - /login
      - method: post
      - body: email:string, password:string
      - res: { msg:string, token: string }
    - /login/facebook
      - method: get
      - res: redirect to '/api/v1/user/login/facebook/return'
    - /login/facebook/return
      - method: get
      - res: redirect to '/login?token=xxxx'
    - /check
      - method: get
      - header: Authorization
      - res: { msg:string, user:object }

  - product

    - /
      - method: get
      - res: { products:array }
    - /:id
      - method: get
      - res: { products:object}
    - /
      - method: post
      - body: name:string, category:string, price:string, description:string, quantity:string
      - res: { msg:string }
    - /
      - method: put
      - body: name:string, category:string, price:string, description:string, quantity:string
      - res: { msg:string }
    - /:id
      - method: delete
      - res: { msg:string }

  - product/image

    - /:product_id
      - method: post
      - body: image:file
      - res: { msg:string }
    - /:product_id
      - method: delete
      - res: { msg:string }

  - comment

    - /
      - method: get
      - header: Authorization
      - res: { comments:array }
    - /:product_id
      - method: post
      - header: Authorization
      - body: description:string, rating:number
      - res: { msg:string }
    - /:comment_id
      - method: put
      - header: Authorization
      - body: description:string, rating:number
      - res: { msg:string }
    - /:comment_id
      - method: delete
      - header: Authorization
      - res: { msg:string }

  - cart

    - /
      - method: get
      - header: Authorization
      - res: { carts:array }
    - /:product_id
      - method: post
      - header: Authorization
      - body: quantity:number
      - res: { msg:string }
    - /:cart_id
      - method: delete
      - header: Authorization
      - res: { msg:string }

  - shipment

    - /
      - method: get
      - header: Authorization
      - res: { shipments:array }
    - /
      - method: put
      - header: Authorization
      - body: name:string, address:string, district:string, province:string, zip:number, phone:number
      - res: { msg:string }
    - /:shipment_id
      - method: put
      - header: Authorization
      - body: name:string, address:string, district:string, province:string, zip:number, phone:number
      - res: { msg:string }
    - /:shipment_id
      - method: delete
      - header: Authorization
      - res: { msg:string }

  - order

    - /
      - method: get
      - header: Authorization
      - res: { comments:array }
    - /
      - method: post
      - header: Authorization
      - body: shipment_id:number
      - res: { msg:string }
    - /:order_id
      - method: put
      - header: Authorization
      - body: status:number
      - res: { msg:string }
