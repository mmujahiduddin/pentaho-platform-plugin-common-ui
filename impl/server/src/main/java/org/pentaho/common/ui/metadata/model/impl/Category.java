/*! ******************************************************************************
 *
 * Pentaho
 *
 * Copyright (C) 2024 by Hitachi Vantara, LLC : http://www.pentaho.com
 *
 * Use of this software is governed by the Business Source License included
 * in the LICENSE.TXT file.
 *
 * Change Date: 2028-08-13
 ******************************************************************************/


package org.pentaho.common.ui.metadata.model.impl;

import java.io.Serializable;

import org.pentaho.common.ui.metadata.model.ICategory;

/**
 * Concrete, lightweight, serializable implementation of an {@see ICategory} object
 * 
 * @author jamesdixon
 * 
 */
public class Category implements ICategory, Serializable {

  private static final long serialVersionUID = -454688567483551796L;
  private String id, name, description;
  private Column[] columns = new Column[0];

  /**
   * Returns the id of the category
   */
  @Override
  public String getId() {
    if ( this.id != null ) {
      return this.id.replaceAll( "<", "&lt;" ).replaceAll( ">", "&gt;" );
    }
    return this.id;
  }

  /**
   * Returns the name of the cateogry for the current locale
   */
  @Override
  public String getName() {
    if ( this.name != null ) {
      return this.name.replaceAll( "<", "&lt;" ).replaceAll( ">", "&gt;" );
    } else {
      return this.name;
    }
  }

  /**
   * Returns the id of the category
   * 
   * @param id
   */
  public void setId( String id ) {
    this.id = id;
  }

  /**
   * Sets the name of the category
   * 
   * @param name
   */
  public void setName( String name ) {
    this.name = name;
  }

  /**
   * Returns the array of {@see IColumn}s for this category
   */
  @Override
  public Column[] getColumns() {
    return columns;
  }

  /**
   * Sets the array of {@see IColumn}s for this category
   * 
   * @param columns
   */
  public void setColumns( Column[] columns ) {
    this.columns = columns;
  }

  public void setDescription( String description ) {
    this.description = description;
  }

  public String getDescription() {
    return description;
  }

}
