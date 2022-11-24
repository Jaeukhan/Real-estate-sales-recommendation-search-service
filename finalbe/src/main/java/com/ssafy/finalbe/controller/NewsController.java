package com.ssafy.finalbe.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.finalbe.model.NewsDto;
import com.ssafy.finalbe.model.service.NewsService;


@RestController
@RequestMapping("/news")
public class NewsController {

	@Autowired
	private NewsService nservice;


	@GetMapping
	public void loadnews() throws Exception {
		nservice.load();
	}

	@GetMapping("/read")
	public ResponseEntity<?> readnews() throws Exception {
		return new ResponseEntity<List<NewsDto>>(nservice.newsList(),HttpStatus.ACCEPTED);
	}

}
