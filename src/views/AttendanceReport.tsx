import {useState, useEffect} from "react";
import { Document, Page, Text, View, Image, Font} from '@react-pdf/renderer';
import styles from "./styles";
import { AttendanceEventBody, TargetEventType } from "./types";
import path from 'path';

// ----------------------------------------------------------------
interface AttendanceReportProps {
  attendance: AttendanceEventBody[] | [],
  event: TargetEventType[] | [],
};

Font.registerHyphenationCallback(word => [word]);
// -------------------------------------------------------------
export default function AttendanceReport({attendance, event}: AttendanceReportProps) {
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth()+1;
  const year = currentDate.getFullYear();
  const hour = currentDate.getHours();
  const minute = currentDate.getMinutes();
  let second = currentDate.getSeconds();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

  const PDF_TITLE = event[0].title || '';
  const PDF_TITLE_DATE = new Date(event[0].date)?.toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }) || '';

  return(
      <Document>
        <Page size="A4" style={styles.page} orientation="portrait">
          <View style={styles.header} fixed>
            <View style={{flexDirection:'column', justifyContent:'center', alignItems:'center', paddingTop:15, paddingBottom:15, paddingRight:70, paddingLeft:70}} wrap={false}>
              <Text style={{fontFamily: 'Helvetica-Bold', textAlign:'center', fontSize: 14, marginBottom:3}}> Daftar Hadir </Text>
              <Text style={{fontFamily: 'Helvetica-Bold', textAlign:'center', fontSize: 14, marginBottom:3}}> {PDF_TITLE} </Text>
              <Text style={{fontSize: 12, textAlign:'center',marginBottom:3}}> {PDF_TITLE_DATE} </Text>
            </View>
            <Image style={{position: 'absolute', right: 0, alignSelf: 'center', width: 65, height: 65}} src={`${process.env.API_URL}/qr/qr_${event[0].id}.png`}/>
          </View>

          <View style={styles.table} > 
              <View style={styles.tableRow} fixed> 
                <View style={{...styles.tableHead, width:'5%'}}> 
                  <Text style={styles.tableHeadCell}>No</Text> 
                </View> 
                <View style={{...styles.tableHead, width:'30%'}}> 
                  <Text style={styles.tableHeadCell}>Nama</Text> 
                </View>
                <View style={{...styles.tableHead, width:'29%'}}> 
                  <Text style={styles.tableHeadCell}>Email</Text> 
                </View> 
                <View style={{...styles.tableHead, width:'26%'}}> 
                  <Text style={styles.tableHeadCell}>Unit</Text> 
                </View> 
                <View style={{...styles.tableHead, width:'10%'}}> 
                  <Text style={styles.tableHeadCell}>Waktu</Text> 
                  <Text style={styles.tableHeadCell}>Absen</Text> 
                </View>
              </View>
              {attendance?.map((row, index)=> {
                return (
                  <View style={styles.tableRow} key={index} wrap={false}> 
                    <View style={{...styles.tableCol, width:'5%'}}> 
                      <Text style={styles.tableCell}>{index+1}</Text> 
                    </View> 
                    <View style={{...styles.tableCol, width:'30%'}}>
                      <Text style={styles.tableCell}>{`${row.name}/`}</Text> 
                      <Text style={styles.tableCell}>{row.identifier}</Text> 
                    </View>
                    <View style={{...styles.tableCol, width:'29%'}}> 
                      <Text style={{...styles.tableCell, overflow:'hidden', textOverflow: 'ellipsis'}}>{row.email}</Text> 
                    </View>
                    <View style={{...styles.tableCol, width:'26%'}}> 
                      <Text style={{...styles.tableCell}}>{row.unit}</Text> 
                    </View> 
                    <View style={{...styles.tableCol, width:'10%'}}> 
                      <Text style={{...styles.tableCell, overflow:'hidden', textOverflow: 'ellipsis'}}>{new Date(row.submitted_at).toLocaleString('en-GB')}</Text> 
                    </View> 
                  </View>           
                )
              })}
              {attendance?.length===0 && <Text style={{...styles.tableHeadCell, marginTop: 50}}>Belum ada kehadiran</Text> }
          </View>

          <View style={styles.footer} fixed>
            <Text style={{ textAlign: 'center', marginRight:100}} render={({ pageNumber, totalPages }) => (
              `Hal: ${pageNumber} dari ${totalPages} halaman`
            )} />
            <Text style={{fontSize:8}}>Di generate pada: {currentDate && `${date}-${month}-${year} ${hour}:${minute}:${second}`} </Text>
          </View>

          </Page>
      </Document>
  )
};