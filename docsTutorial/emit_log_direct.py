import pika
import sys

connection = pika.BlockingConnection(pika.ConnectionParameters(
        host='localhost'))
channel = connection.channel()

channel.exchange_declare(exchange='direct_logs',
                         type='direct')

severity = sys.argv[1] if len(sys.argv) > 1 else 'info'
# message = ' '.join(sys.argv[2:]) or 'Hello World!'
for x in range(100000):
	if (x % 2 == 0):
		channel.basic_publish(exchange='direct_logs',
		                      routing_key=severity,
		                      body=str(x))
		print(" [x] Sent %r:%r" % (severity, x))
	else:
		channel.basic_publish(exchange='direct_logs',
							routing_key='warning',
							body=str(x))
		print('value %r' % (x))
connection.close()