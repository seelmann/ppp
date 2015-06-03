
## Performance

https://spark.apache.org/docs/latest/programming-guide.html

Operations which can cause a shuffle include repartition operations like repartition, and coalesce, ‘ByKey operations (except for counting) like groupByKey and reduceByKey, and join operations like cogroup and join.

Performance Impact

The Shuffle is an expensive operation since it involves disk I/O, data serialization, and network I/O. To organize data for the shuffle, Spark generates sets of tasks - map tasks to organize the data, and a set of reduce tasks to aggregate it. This nomenclature comes from MapReduce and does not directly relate to Spark’s map and reduce operations.
...
Certain shuffle operations can consume significant amounts of heap memory since they employ in-memory data structures to organize records before or after transferring them. Specifically, reduceByKey and aggregateByKey create these structures on the map side and 'ByKey operations generate these on the reduce side. When data does not fit in memory Spark will spill these tables to disk, incurring the additional overhead of disk I/O and increased garbage collection.
...
Shuffle also generates a large number of intermediate files on disk. As of Spark 1.3, these files are not cleaned up from Spark’s temporary storage until Spark is stopped, which means that long-running Spark jobs may consume available disk space. This is done so the shuffle doesn’t need to be re-computed if the lineage is re-computed.
...
Shuffle behavior can be tuned by adjusting a variety of configuration parameters. See the ‘Shuffle Behavior’ section within the Spark Configuration Guide. 

## Dataset

    wget http://files.grouplens.org/datasets/movielens/ml-20m.zip

    cd /root/Development/spark-1.3.1-bin-hadoop2.6
    ./bin/spark-shell --master local[8]

    val movies = sc.textFile("/root/Downloads/MovieLens/ml-20m/movies.csv")
    movies.count()
    movies.take(5).foreach(println)
    val ratings = sc.textFile("/root/Downloads/MovieLens/ml-20m/ratings.csv")
    ratings.count()
    ratings.take(5).foreach(println)

## SQL

    cd /root/Development/spark-1.3.1-bin-hadoop2.6
    ./bin/spark-shell --master local[8] --driver-memory 16g --packages com.databricks:spark-csv_2.10:1.0.3

    import com.databricks.spark.csv._
    val movies = sqlContext.csvFile("/root/Downloads/MovieLens/ml-20m/movies.csv")
    val ratings = sqlContext.csvFile("/root/Downloads/MovieLens/ml-20m/ratings.csv")
    movies.show
    ratings.show

    movies.count
    ratings.count

    movies.cache
    ratings.cache

    movies.registerTempTable("movies")
    ratings.registerTempTable("ratings")

    sqlContext.sql("SELECT COUNT(*) FROM movies").collect
    sqlContext.sql("SELECT COUNT(*) FROM ratings").collect

    sqlContext.sql("SELECT title, rating FROM movies, ratings LIMIT 10").show
    sqlContext.sql("SELECT title, count(rating) FROM movies JOIN ratings ON movies.movieId=ratings.movieId GROUP BY title LIMIT 10").show
    sqlContext.sql("SELECT title, count(rating) num FROM movies JOIN ratings ON movies.movieId=ratings.movieId GROUP BY title ORDER BY num DESC LIMIT 10").show


