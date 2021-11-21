package com.mycompany.myapp.domain;

import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Docgia.
 */
@Entity
@Table(name = "docgia")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@org.springframework.data.elasticsearch.annotations.Document(indexName = "docgia")
public class Docgia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "ho_ten")
    private String hoTen;

    @Column(name = "ngay_sinh")
    private Instant ngaySinh;

    @Column(name = "dia_chi")
    private String diaChi;

    @Column(name = "cmt")
    private String cmt;

    @Column(name = "trang_thai")
    private Integer trangThai;

    @Column(name = "tien_coc")
    private Long tienCoc;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Docgia id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getHoTen() {
        return this.hoTen;
    }

    public Docgia hoTen(String hoTen) {
        this.setHoTen(hoTen);
        return this;
    }

    public void setHoTen(String hoTen) {
        this.hoTen = hoTen;
    }

    public Instant getNgaySinh() {
        return this.ngaySinh;
    }

    public Docgia ngaySinh(Instant ngaySinh) {
        this.setNgaySinh(ngaySinh);
        return this;
    }

    public void setNgaySinh(Instant ngaySinh) {
        this.ngaySinh = ngaySinh;
    }

    public String getDiaChi() {
        return this.diaChi;
    }

    public Docgia diaChi(String diaChi) {
        this.setDiaChi(diaChi);
        return this;
    }

    public void setDiaChi(String diaChi) {
        this.diaChi = diaChi;
    }

    public String getCmt() {
        return this.cmt;
    }

    public Docgia cmt(String cmt) {
        this.setCmt(cmt);
        return this;
    }

    public void setCmt(String cmt) {
        this.cmt = cmt;
    }

    public Integer getTrangThai() {
        return this.trangThai;
    }

    public Docgia trangThai(Integer trangThai) {
        this.setTrangThai(trangThai);
        return this;
    }

    public void setTrangThai(Integer trangThai) {
        this.trangThai = trangThai;
    }

    public Long getTienCoc() {
        return this.tienCoc;
    }

    public Docgia tienCoc(Long tienCoc) {
        this.setTienCoc(tienCoc);
        return this;
    }

    public void setTienCoc(Long tienCoc) {
        this.tienCoc = tienCoc;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Docgia)) {
            return false;
        }
        return id != null && id.equals(((Docgia) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Docgia{" +
            "id=" + getId() +
            ", hoTen='" + getHoTen() + "'" +
            ", ngaySinh='" + getNgaySinh() + "'" +
            ", diaChi='" + getDiaChi() + "'" +
            ", cmt='" + getCmt() + "'" +
            ", trangThai=" + getTrangThai() +
            ", tienCoc=" + getTienCoc() +
            "}";
    }
}
