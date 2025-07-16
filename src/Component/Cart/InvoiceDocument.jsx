// components/pdf/InvoiceDocument.jsx
import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { format } from 'date-fns';

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    fontSize: 20,
    marginBottom: 10,
    color: 'green',
    textAlign: 'center',
  },
  companyInfo: {
    fontSize: 12,
    marginBottom: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
  line: {
    marginVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }
});

const InvoiceDocument = ({ order }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>MediShop Invoice</Text>

      <View style={styles.section}>
        <Text style={styles.companyInfo}>Vaxin Ltd.</Text>
        <Text style={styles.companyInfo}>Email: support@vaxinshop.com</Text>
        <Text style={styles.companyInfo}>Phone: +880-1234-567890</Text>
      </View>

      <View style={styles.line} />

      <View style={styles.section}>
        <Text><Text style={styles.bold}>Invoice ID:</Text> {order._id}</Text>
        <Text><Text style={styles.bold}>Customer:</Text>  ({order.customer?.email})</Text>
        <Text><Text style={styles.bold}>Medicine:</Text> {order.itemName}</Text>
        <Text><Text style={styles.bold}>Quantity:</Text> {order.quantity}</Text>
        <Text><Text style={styles.bold}>Total Paid:</Text> ${order.totalAmount}</Text>
        <Text><Text style={styles.bold}>Transaction ID:</Text> {order.transactionId}</Text>
        <Text><Text style={styles.bold}>Payment Status:</Text> {order.paymentStatus}</Text>
        <Text><Text style={styles.bold}>Date:</Text> {format(new Date(order.paidAt), 'PPP')}</Text>
      </View>

      <View style={styles.line} />
      <Text style={{ fontStyle: 'italic', color: 'green', textAlign: 'center' }}>Thank you for shopping with us!</Text>
    </Page>
  </Document>
);

export default InvoiceDocument;
