import pika

conn = pika.ConnectionParameters(host='localhost')
connection = pika.BlockingConnection(conn)
channel = connection.channel()

channel.exchange_declare(exchange='data', 
						type='fanout')