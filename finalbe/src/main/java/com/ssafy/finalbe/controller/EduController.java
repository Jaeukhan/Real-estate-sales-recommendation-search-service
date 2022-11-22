package com.ssafy.finalbe.controller;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.json.JSONObject;
import org.json.XML;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

@RestController
@RequestMapping("/edu")
@Api("Edu Controller")
public class EduController {
    private final Logger logger = LoggerFactory.getLogger(HouseMapController.class);

    @ApiOperation(value = "유치원 목록", response = List.class)
    @GetMapping(value = "/kinder/{gugunName}/{gugunCode}", produces = "application/json;charset=utf-8")
    public ResponseEntity<String> kinderList(@PathVariable("gugunName") String gugunName, @PathVariable("gugunCode") String gugunCode) throws IOException {
        logger.info("kinder - 호출");
        System.out.println(gugunName+" "+gugunCode);
        String serviceKey = "caa3a449c5c8411e910663f1df33cece";
        StringBuilder urlBuilder = new StringBuilder(
                "https://openapi.gg.go.kr/Kndrgrschoolstus");

//		serviceKey = URLDecoder.decode(serviceKey, "UTF-8");

        urlBuilder.append("?" + URLEncoder.encode("KEY", "UTF-8")
                + "=" + serviceKey);
        urlBuilder
                .append("&" + URLEncoder.encode("pIndex", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /* 페이지번호 */
        urlBuilder.append("&" + URLEncoder.encode("pSize", "UTF-8") + "="
                + URLEncoder.encode("100", "UTF-8")); /* 한 페이지 결과 수 */
        urlBuilder.append(
                "&" + URLEncoder.encode("SIGUN_NM", "UTF-8") + "=" + URLEncoder.encode("고양시", "UTF-8")); /* 지역코드 */
        urlBuilder.append(
                "&" + URLEncoder.encode("SIGUN_CD", "UTF-8") + "=" + URLEncoder.encode("41280", "UTF-8")); /* 계약월 */
        System.out.println(urlBuilder.toString());
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        System.out.println(sb.toString());

        //JSONObject json = XML.toJSONObject(sb.toString());
        String jsonStr = sb.toString();

        return new ResponseEntity<String>(jsonStr, HttpStatus.OK);
    }

    @ApiOperation(value = "초등학교 목록", response = List.class)
    @GetMapping(value = "/element/{gugunName}/{gugunCode}", produces = "application/json;charset=utf-8")
    public ResponseEntity<String> elementList(@PathVariable("gugunName") String gugunName, @PathVariable("gugunCode") String gugunCode) throws IOException {
        logger.info("kinder - 호출");
        String serviceKey = "caa3a449c5c8411e910663f1df33cece";
        StringBuilder urlBuilder = new StringBuilder(
                "https://openapi.gg.go.kr/ElmschlM");

//		serviceKey = URLDecoder.decode(serviceKey, "UTF-8");

        urlBuilder.append("?" + URLEncoder.encode("KEY", "UTF-8")
                + "=" + serviceKey);
        urlBuilder
                .append("&" + URLEncoder.encode("pIndex", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /* 페이지번호 */
        urlBuilder.append("&" + URLEncoder.encode("pSize", "UTF-8") + "="
                + URLEncoder.encode("20", "UTF-8")); /* 한 페이지 결과 수 */
        urlBuilder.append(
                "&" + URLEncoder.encode("SIGUN_NM", "UTF-8") + "=" + URLEncoder.encode("고양시", "UTF-8")); /* 지역코드 */
        urlBuilder.append(
                "&" + URLEncoder.encode("SIGUN_CD", "UTF-8") + "=" + URLEncoder.encode("41280", "UTF-8")); /* 계약월 */
        System.out.println(urlBuilder.toString());
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        System.out.println(sb.toString());

        //JSONObject json = XML.toJSONObject(sb.toString());
        String jsonStr = sb.toString();

        return new ResponseEntity<String>(jsonStr, HttpStatus.OK);
    }

    @ApiOperation(value = "중학교 목록", response = List.class)
    @GetMapping(value = "/middle/{gugunName}/{gugunCode}", produces = "application/json;charset=utf-8")
    public ResponseEntity<String> middleList(@PathVariable("gugunName") String gugunName, @PathVariable("gugunCode") String gugunCode) throws IOException {
        logger.info("kinder - 호출");
        String serviceKey = "caa3a449c5c8411e910663f1df33cece";
        StringBuilder urlBuilder = new StringBuilder(
                "https://openapi.gg.go.kr/MskulM");

//		serviceKey = URLDecoder.decode(serviceKey, "UTF-8");

        urlBuilder.append("?" + URLEncoder.encode("KEY", "UTF-8")
                + "=" + serviceKey);
        urlBuilder
                .append("&" + URLEncoder.encode("pIndex", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /* 페이지번호 */
        urlBuilder.append("&" + URLEncoder.encode("pSize", "UTF-8") + "="
                + URLEncoder.encode("20", "UTF-8")); /* 한 페이지 결과 수 */
        urlBuilder.append(
                "&" + URLEncoder.encode("SIGUN_NM", "UTF-8") + "=" + URLEncoder.encode("고양시", "UTF-8")); /* 지역코드 */
        urlBuilder.append(
                "&" + URLEncoder.encode("SIGUN_CD", "UTF-8") + "=" + URLEncoder.encode("41280", "UTF-8")); /* 계약월 */
        System.out.println(urlBuilder.toString());
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        System.out.println(sb.toString());

        //JSONObject json = XML.toJSONObject(sb.toString());
        String jsonStr = sb.toString();

        return new ResponseEntity<String>(jsonStr, HttpStatus.OK);
    }


    @ApiOperation(value = "고등학교 목록", response = List.class)
    @GetMapping(value = "/high/{gugunName}/{gugunCode}", produces = "application/json;charset=utf-8")
    public ResponseEntity<String> schoolList(@PathVariable("gugunName") String gugunName, @PathVariable("gugunCode") String gugunCode) throws IOException {
        logger.info("kinder - 호출");
        String serviceKey = "caa3a449c5c8411e910663f1df33cece";
        StringBuilder urlBuilder = new StringBuilder(
                "https://openapi.gg.go.kr/HgschlM");

//		serviceKey = URLDecoder.decode(serviceKey, "UTF-8");

        urlBuilder.append("?" + URLEncoder.encode("KEY", "UTF-8")
                + "=" + serviceKey);
        urlBuilder
                .append("&" + URLEncoder.encode("pIndex", "UTF-8") + "=" + URLEncoder.encode("1", "UTF-8")); /* 페이지번호 */
        urlBuilder.append("&" + URLEncoder.encode("pSize", "UTF-8") + "="
                + URLEncoder.encode("20", "UTF-8")); /* 한 페이지 결과 수 */
        urlBuilder.append(
                "&" + URLEncoder.encode("SIGUN_NM", "UTF-8") + "=" + URLEncoder.encode("고양시", "UTF-8")); /* 지역코드 */
        urlBuilder.append(
                "&" + URLEncoder.encode("SIGUN_CD", "UTF-8") + "=" + URLEncoder.encode("41280", "UTF-8")); /* 계약월 */
        System.out.println(urlBuilder.toString());
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }
        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
        System.out.println(sb.toString());

        //JSONObject json = XML.toJSONObject(sb.toString());
        String jsonStr = sb.toString();

        return new ResponseEntity<String>(jsonStr, HttpStatus.OK);
    }
}
