package com.mycompany.myapp.domain;

import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Sach.
 */
@Entity
@Table(name = "sach")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "sach")
public class Sach implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ten_sach")
    private String tenSach;

    @Column(name = "gia_niem_yet")
    private Integer giaNiemYet;

    @Column(name = "tacgia")
    private String tacgia;

    @Column(name = "gia_thue")
    private Long giaThue;

    @Column(name = "ngan_xep")
    private String nganXep;

    @Column(name = "theloai")
    private String theloai;

    @OneToOne
    @JoinColumn(unique = true)
    private Nhaxuatban nhaxuatban;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Sach id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTenSach() {
        return this.tenSach;
    }

    public Sach tenSach(String tenSach) {
        this.setTenSach(tenSach);
        return this;
    }

    public void setTenSach(String tenSach) {
        this.tenSach = tenSach;
    }

    public Integer getGiaNiemYet() {
        return this.giaNiemYet;
    }

    public Sach giaNiemYet(Integer giaNiemYet) {
        this.setGiaNiemYet(giaNiemYet);
        return this;
    }

    public void setGiaNiemYet(Integer giaNiemYet) {
        this.giaNiemYet = giaNiemYet;
    }

    public String getTacgia() {
        return this.tacgia;
    }

    public Sach tacgia(String tacgia) {
        this.setTacgia(tacgia);
        return this;
    }

    public void setTacgia(String tacgia) {
        this.tacgia = tacgia;
    }

    public Long getGiaThue() {
        return this.giaThue;
    }

    public Sach giaThue(Long giaThue) {
        this.setGiaThue(giaThue);
        return this;
    }

    public void setGiaThue(Long giaThue) {
        this.giaThue = giaThue;
    }

    public String getNganXep() {
        return this.nganXep;
    }

    public Sach nganXep(String nganXep) {
        this.setNganXep(nganXep);
        return this;
    }

    public void setNganXep(String nganXep) {
        this.nganXep = nganXep;
    }

    public String getTheloai() {
        return this.theloai;
    }

    public Sach theloai(String theloai) {
        this.setTheloai(theloai);
        return this;
    }

    public void setTheloai(String theloai) {
        this.theloai = theloai;
    }

    public Nhaxuatban getNhaxuatban() {
        return this.nhaxuatban;
    }

    public void setNhaxuatban(Nhaxuatban nhaxuatban) {
        this.nhaxuatban = nhaxuatban;
    }

    public Sach nhaxuatban(Nhaxuatban nhaxuatban) {
        this.setNhaxuatban(nhaxuatban);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Sach)) {
            return false;
        }
        return id != null && id.equals(((Sach) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Sach{" +
            "id=" + getId() +
            ", tenSach='" + getTenSach() + "'" +
            ", giaNiemYet=" + getGiaNiemYet() +
            ", tacgia='" + getTacgia() + "'" +
            ", giaThue=" + getGiaThue() +
            ", nganXep='" + getNganXep() + "'" +
            ", theloai='" + getTheloai() + "'" +
            "}";
    }
}
