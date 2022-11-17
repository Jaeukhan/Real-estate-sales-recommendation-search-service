package com.ssafy.finalbe.model.service;

import com.ssafy.finalbe.model.MemberDto;

public interface MemberService {

	public MemberDto login(MemberDto memberDto) throws Exception;
	public MemberDto userInfo(String userid) throws Exception;
	
}
