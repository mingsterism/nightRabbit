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

channel.exchange_declare(exchange=AMQP_EXCHANGE, type="fanout", queue='task')
for x in range(10):
	channel.basic_publish(exchange=AMQP_EXCHANGE,
		routing_key='task',
		body=str(x))
	print("Sent ", message)
connection.close()

