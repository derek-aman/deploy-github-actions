FROM node

ENV  MONGO_DB_USERNAME=aman_admin \
     MONGO_DB_PWD=aman_password


RUN mkdir -p delta/backend

COPY . /delta/backend

CMD ["node", "/delta/backend/index.js"]