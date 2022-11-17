package com.ssafy.finalbe.model.service;

import java.util.List;

import com.ssafy.finalbe.model.BoardDto;
import com.ssafy.finalbe.model.BoardParameterDto;

public interface BoardService {
	public boolean writeArticle(BoardDto boardDto) throws Exception;
	public List<BoardDto> listArticle(BoardParameterDto boardParameterDto) throws Exception;
	
	public BoardDto getArticle(int articleno) throws Exception;
	public void updateHit(int articleno) throws Exception;
	public boolean modifyArticle(BoardDto boardDto) throws Exception;
	public boolean deleteArticle(int articleno) throws Exception;
}
