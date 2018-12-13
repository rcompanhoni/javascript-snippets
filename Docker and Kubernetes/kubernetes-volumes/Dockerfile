FROM ubuntu:latest
RUN apt-get update ; apt-get -y install fortune
COPY fortuneloop.sh /bin/fortuneloop.sh
ENTRYPOINT /bin/fortuneloop.sh