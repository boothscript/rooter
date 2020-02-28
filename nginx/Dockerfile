FROM nginx

COPY ./default.conf /etc/nginx/conf.d

EXPOSE 80/tcp
EXPOSE 443/tcp

CMD ["/bin/bash", "-c", "exec nginx -g 'daemon off;';"]

