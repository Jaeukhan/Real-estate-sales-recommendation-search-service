package com.ssafy.finalbe.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransportDto {
	private String stopname, stopno, cityname;
	private int sidocode;
	private double lat, lon;
	
	public TransportDto(String stopname, String stopno, String cityname, int sidocode, double lat, double lon) {
		this.stopname = stopname;
		this.stopno = stopno;
		this.cityname = cityname;
		this.sidocode = sidocode;
		this.lat = lat;
		this.lon = lon;
	}

	public String getStopname() {
		return stopname;
	}

	public void setStopname(String stopname) {
		this.stopname = stopname;
	}

	public String getStopno() {
		return stopno;
	}

	public void setStopno(String stopno) {
		this.stopno = stopno;
	}

	public String getCityname() {
		return cityname;
	}

	public void setCityname(String cityname) {
		this.cityname = cityname;
	}

	public int getSidocode() {
		return sidocode;
	}

	public void setSidocode(int sidocode) {
		this.sidocode = sidocode;
	}

	public double getLat() {
		return lat;
	}

	public void setLat(double lat) {
		this.lat = lat;
	}

	public double getLon() {
		return lon;
	}

	public void setLon(double lon) {
		this.lon = lon;
	}

	@Override
	public String toString() {
		return "TransportDto [stopname=" + stopname + ", stopno=" + stopno + ", cityname=" + cityname + ", sidocode="
				+ sidocode + ", lat=" + lat + ", lon=" + lon + "]";
	}
	
}
