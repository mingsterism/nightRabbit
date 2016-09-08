import pika

AMQP_SERVER = "localhost"
AMQP_USER = "admin1"
AMQP_PASS = "admin"
AMQP_VHOST = "/"
AMQP_EXCHANGE = "alerts"

broker_creds = pika.PlainCredentials(AMQP_USER, AMQP_PASS)
conn_params = pika.ConnectionParameters(
	host=AMQP_SERVER,
	virtual_host=AMQP_VHOST,
	credentials=broker_creds)
connection = pika.BlockingConnection(conn_params)
channel = connection.channel()
channel.exchange_declare(queue='task')
channel.queue_bind(exchange=AMQP_EXCHANGE,
                   queue='task')

print(' [*] Waiting for logs. To exit press CTRL+C')

def callback(ch, method, properties, body):
    print(" [x] %r" % body)

channel.basic_consume(callback,
                      queue='task',
                      no_ack=True)

channel.start_consuming()
