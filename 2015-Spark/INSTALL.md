
## Java

    apt-get update
    apt-get dist-upgrade
    
    apt-get install tree unzip
    
    apt-get install openjdk-7-jdk
    
    add-apt-repository ppa:webupd8team/java
    apt-get update
    apt-get install oracle-java8-installer
    apt-get install oracle-java8-set-default


## Spark

    wget http://d3kbcqa49mib13.cloudfront.net/spark-1.3.1-bin-hadoop2.6.tgz
    tar -xzvf ../Downloads/spark-1.3.1-bin-hadoop2.6.tgz

    cp conf/log4j.properties.template conf/log4j.properties
    vi conf/log4j.properties

    ./bin/run-example SparkPi 10

    ./bin/spark-shell --master local[8]

    val lines = sc.textFile("README.md")
    lines.count()
    lines.first()

    val linesWithSpark = lines.filter(line => line.contains("Spark"))
    linesWithSpark.count()

    lines.flatMap(line => line.split(" ")).map(word => (word, 1)).reduceByKey((a, b) => a + b).collect()



##  Docker

    wget -qO- https://get.docker.com/ | sh
    docker pull sequenceiq/spark:1.3.0
    docker run -it -h sandbox sequenceiq/spark:1.3.0 bash

    spark-shell --master yarn-client --driver-memory 1g --executor-memory 1g --executor-cores 1
    sc.parallelize(1 to 1000).count()

